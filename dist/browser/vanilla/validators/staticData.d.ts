import type { output } from "zod";
export declare const staticDataSchema: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodUnion<readonly [import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>, import("zod").ZodArray<import("zod").ZodUnknown>]>>>;
export type TStaticData = output<typeof staticDataSchema>;
