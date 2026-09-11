import type { output } from "zod";
export declare const fullDataSchema: import("zod").ZodObject<{
    metadata: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>>>;
    data: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>>;
    staticData: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodUnion<readonly [import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>, import("zod").ZodArray<import("zod").ZodUnknown>]>>>;
}, import("zod/v4/core").$strip>;
export type TFullData = output<typeof fullDataSchema>;
