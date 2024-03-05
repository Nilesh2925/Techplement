import { z } from "zod";

const auditSchema = z.object({
  email: z.string().email(),
  history: z.string(),
});

export default auditSchema;
