import type { output } from "zod";
export declare const metadataSchema: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>>>;
export type TMetadata = output<typeof metadataSchema>;
