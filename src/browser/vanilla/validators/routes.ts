import type { output } from "zod";

import { object, string } from "zod";

export const routeSchema = object({
    path: string().trim().nonempty(),
    component: string().trim().nonempty()
});

export type TRoute = output<typeof routeSchema>;
