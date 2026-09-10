import type { output } from "zod";

import { record, string } from "zod";

export const metadataSchema = record(string(), string().nullish()).nullish();

export type TMetadata = output<typeof metadataSchema>;
