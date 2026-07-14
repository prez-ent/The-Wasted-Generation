import { Router, type IRouter, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, documentsTable, profilesTable } from "@workspace/db";
import { SelectSideBody, CreateMyDocumentBody } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";
import { buildMeResponse, documentRecordView } from "../lib/views";

const router: IRouter = Router();

router.get("/me", requireAuth, async (req: Request, res: Response): Promise<void> => {
  res.json(await buildMeResponse(req.profile!));
});

router.post("/me/side", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const profile = req.profile!;
  const parsed = SelectSideBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Choose either the practitioner or client journey." });
    return;
  }
  if (profile.side !== null) {
    res.status(400).json({ error: "Your journey is already set. Contact the team to change it." });
    return;
  }
  const [updated] = await db
    .update(profilesTable)
    .set({ side: parsed.data.side })
    .where(eq(profilesTable.id, profile.id))
    .returning();
  res.json(await buildMeResponse(updated));
});

router.post("/me/documents", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const profile = req.profile!;
  if (profile.verifiedAt === null) {
    res.status(403).json({ error: "Your account has not been verified yet." });
    return;
  }
  const parsed = CreateMyDocumentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid document details." });
    return;
  }
  const [doc] = await db
    .insert(documentsTable)
    .values({
      profileId: profile.id,
      label: parsed.data.label,
      kind: parsed.data.kind,
      objectPath: parsed.data.objectPath,
      uploadedByProfileId: profile.id,
    })
    .returning();
  req.log.info({ profileId: profile.id, documentId: doc.id }, "Owner uploaded document");
  res.status(201).json(documentRecordView(doc));
});

export default router;
