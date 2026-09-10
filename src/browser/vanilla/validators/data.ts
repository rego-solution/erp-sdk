import type { output } from "zod";

import { record, string, unknown } from "zod";

export const dataSchema = record(string(), unknown()).nullish();

export type TData = output<typeof dataSchema>;
