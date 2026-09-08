import type { ICrmApp, TCredential, TOptions } from "../types";

import { App } from "./app";

export class CrmApp extends App implements ICrmApp {
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
