---
name: Resend email integration
description: How form emails are sent, and how to debug Resend connector failures
---

- Emails go through the Replit Resend connector proxy (`connectors.proxy("resend", "/emails")`), not a raw API key env var. The API key lives in the user's Resend connection, not in this repo.
- **Why persist-first:** all four checkpoint-form routes insert into Postgres before attempting email, and email failures only log (never fail the request), so submissions are never lost to email outages.
- **How to debug send failures:** isolate credentials from app code with a plain proxy call, e.g. `connectors.proxy("resend", "/domains", {method:"GET"})`. A 401/400 "API key is invalid" there means the user's stored key is bad — re-propose the connection; no code change will help.
- Sending from `info@thewastedgeneration.com` also requires the domain `thewastedgeneration.com` to be verified in the user's Resend account; an unverified domain fails even with a valid key.
- As of 14 July 2026 the stored key was still invalid after one re-propose round; follow-up task exists to get delivery working.
