import type { IApp, TCredential, TOptions } from "../types";
export declare class App implements IApp {
    protected readonly params: Readonly<{
        credential: TCredential;
        options?: TOptions;
    }>;
    protected appName: string;
    protected defaultVersion: number;
    protected token?: string;
    /**
     * Initialize Rego ERP client instance
     * @param configs
     * @param options
     */
    constructor(params: Readonly<{
        credential: TCredential;
        options?: TOptions;
    }>);
    /**
     * Sign JWT token with Ed25519 algorithm
     * @returns
     */
    signToken(): Promise<string>;
}
