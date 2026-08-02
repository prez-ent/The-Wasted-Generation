import { useState } from "react";
import { useSubmitContactMessage } from "@workspace/api-client-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useSubmitContactMessage();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    mutation.mutate(
      { data: { name: name.trim(), email: email.trim(), subject: subject.trim() || undefined, message: message.trim() } },
      {
        onSuccess: () => setSent(true),
        onError: (err: unknown) => {
          let msg = "Something went wrong. Please try again.";
          if (typeof err === "object" && err !== null) {
            const e = err as { error?: unknown; data?: { error?: unknown }; message?: unknown };
            if (typeof e.data?.error === "string") msg = e.data.error;
            else if (typeof e.error === "string") msg = e.error;
            else if (typeof e.message === "string" && e.message) msg = e.message;
          }
          setError(msg);
        },
      },
    );
  };

  if (sent) {
    return (
      <div className="contact-form-sent" data-testid="text-contact-sent">
        <h3>Message sent.</h3>
        <p>Thank you — the message has gone straight to the team. We aim to respond within one working day.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required data-testid="input-contact-name" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email">Your email</label>
          <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="input-contact-email" />
        </div>
      </div>
      <div className="cf-field">
        <label htmlFor="cf-subject">Subject <span className="cf-optional">(optional — say if it is urgent)</span></label>
        <input id="cf-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} data-testid="input-contact-subject" />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required data-testid="input-contact-message" />
      </div>
      {error && <div className="cf-error" data-testid="text-contact-error">{error}</div>}
      <button type="submit" className="btn btn-amber" disabled={mutation.isPending} data-testid="button-contact-send">
        {mutation.isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
