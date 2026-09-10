import type { IApp } from "./app";
export type TBlueprintRoute = {
    path: string;
    index?: boolean;
    component?: string;
};
export interface ICmsApp extends IApp {
    register(payload: {
        blueprintId?: string;
    }): ICmsApp;
    getRoutes(payload?: {
        pathname?: string;
    }): Promise<{
        hostname?: string | null;
        routes?: Array<TBlueprintRoute> | null;
        staticData?: Array<unknown> | Record<string, unknown> | null;
        metadata?: Record<string, string | null | undefined> | null;
        data?: Record<string, unknown> | null;
    } | null>;
}
