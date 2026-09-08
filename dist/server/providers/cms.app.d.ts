import type { ICmsApp, TCredential, TOptions } from "../types";
import { App } from "./app";
export declare class CmsApp extends App implements ICmsApp {
    #private;
    /**
     * Initialize Rego ERP CMS app instance
     * @param configs
     * @param options
     */
    constructor(params: Readonly<{
        credential: TCredential;
        options?: TOptions;
    }>);
    register(payload: Parameters<ICmsApp["register"]>[number]): ReturnType<ICmsApp["register"]>;
    getRoutes(): ReturnType<ICmsApp["getRoutes"]>;
}
