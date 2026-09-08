import type { IPimApp, TCredential, TOptions } from "../types";

import { App } from "./app";

export class PimApp extends App implements IPimApp {
    /**
     * Initialize Rego ERP PIM app instance
     * @param configs
     * @param options
     */
    constructor(
        params: Readonly<{
            credential: TCredential;
            options?: TOptions;
        }>
    ) {
        super(params);
    }
}
