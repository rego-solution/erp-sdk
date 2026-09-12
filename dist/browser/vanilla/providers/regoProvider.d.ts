import type { IRegoProvider } from "../types";
export declare class RegoProvider implements IRegoProvider {
    #private;
    private readonly window;
    constructor(window: Window);
    setMetadataToElement(...[key, value]: Parameters<IRegoProvider["setMetadataToElement"]>): void;
    inferMetadata(payload: Parameters<IRegoProvider["inferMetadata"]>[number]): void;
    fetchRoute({ cache, ...payload }: Parameters<IRegoProvider["fetchRoute"]>[number]): ReturnType<IRegoProvider["fetchRoute"]>;
    get routes(): {
        path: string;
        component: string;
    }[] | undefined;
    get staticData(): unknown[] | Record<string, unknown> | null | undefined;
    get data(): Record<string, unknown> | null | undefined;
    get metadata(): Record<string, string | null | undefined> | null | undefined;
}
