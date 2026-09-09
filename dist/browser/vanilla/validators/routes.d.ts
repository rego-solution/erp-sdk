import type { output } from "zod";
export declare const routeSchema: import("zod").ZodObject<{
    path: import("zod").ZodString;
    component: import("zod").ZodString;
}, import("zod/v4/core").$strip>;
export type TRoute = output<typeof routeSchema>;
