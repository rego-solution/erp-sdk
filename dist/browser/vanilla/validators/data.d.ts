import type { output } from "zod";
export declare const dataSchema: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>>;
export type TData = output<typeof dataSchema>;
