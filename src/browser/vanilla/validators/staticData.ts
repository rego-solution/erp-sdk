import type { output } from "zod";

import { record, string, union, unknown } from "zod";

export const staticDataSchema = union([
    record(string(), unknown()),
    unknown().array()
]).nullish();

export type TStaticData = output<typeof staticDataSchema>;
