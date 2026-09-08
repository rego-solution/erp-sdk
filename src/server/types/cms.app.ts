import type { IApp } from "./app";

export type TBlueprintRoute = {
    path: string;
    index?: boolean;
    component?: string;
};

export interface ICmsApp extends IApp {
    register(payload: { blueprintId?: string }): ICmsApp;
    getRoutes(payload?: { pathname?: string }): Promise<{
        hostname?: string | null;
        routes?: Array<TBlueprintRoute> | null;
        data?: {
            metadata?: Record<string, string> | null;
            dynamicData?: unknown;
        } | null;
    } | null>;
}
