import { z } from "zod";

export const VerificationSchema = z.object({
  verificationId: z.string(),
  token: z.string().min(6).max(6),
});
