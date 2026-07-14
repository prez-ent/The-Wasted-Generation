import { useRef, useState } from "react";
import {
  useRequestUploadUrl,
  type DocumentInput,
  type DocumentInputKind,
} from "@workspace/api-client-react";

const KIND_LABELS: Record<DocumentInputKind, string> = {
  nda: "NDA",
  pack: "Pack",
  agreement: "Agreement",
  "signed-copy": "Signed copy",
  other: "Other",
};

function extractErrorMessage(err: unknown): string {
  const data = (err as { data?: { error?: string } } | null)?.data;
  return data?.error ?? "Something went wrong. Please try again.";
}

export function DocumentUpload({
  allowedKinds,
  defaultKind,
  onCreate,
  heading,
}: {
  allowedKinds: DocumentInputKind[];
  defaultKind: DocumentInputKind;
  onCreate: (doc: DocumentInput) => Promise<unknown>;
  heading: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<DocumentInputKind>(defaultKind);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const requestUrl = useRequestUploadUrl();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setDone(false);
    try {
      const contentType = file.type || "application/octet-stream";
      const { uploadURL, objectPath } = await requestUrl.mutateAsync({
        data: { name: file.name, size: file.size, contentType },
      });
      const put = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": contentType },
      });
      if (!put.ok) throw new Error(`Upload failed (${put.status})`);
      await onCreate({ label: label.trim() || file.name, kind, objectPath });
      setFile(null);
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
      setDone(true);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={submit} data-testid="form-document-upload">
      <strong className="upload-heading">{heading}</strong>
      <div className="upload-row">
        <input
          ref={fileRef}
          type="file"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setFile(f);
            setDone(false);
            if (f && !label) setLabel(f.name);
          }}
          data-testid="input-document-file"
        />
      </div>
      <div className="upload-row">
        <label>
          Label
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Signed NDA"
            data-testid="input-document-label"
          />
        </label>
        {allowedKinds.length > 1 && (
          <label>
            Type
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as DocumentInputKind)}
              data-testid="select-document-kind"
            >
              {allowedKinds.map((k) => (
                <option key={k} value={k}>
                  {KIND_LABELS[k]}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {error && <div className="upload-error" data-testid="text-upload-error">{error}</div>}
      {done && <div className="upload-done" data-testid="text-upload-done">Document uploaded.</div>}
      <div>
        <button type="submit" className="btn btn-navy" disabled={!file || busy} data-testid="button-upload-document">
          {busy ? "Uploading…" : "Upload document"}
        </button>
      </div>
    </form>
  );
}
