import type { IClient, TApps, TCredential, TOptions } from "../types";
import { App } from "./app";
export declare class Client extends App implements IClient {
    #private;
    /**
     * Initialize Rego ERP client instance
     * @param configs
     * @param options
     */
    constructor(params: Readonly<{
        credential: TCredential;
        options?: TOptions;
    }>);
    use<T extends keyof TApps = "CMS" | "CRM" | "PIM">(domain: T): TApps[T];
}
