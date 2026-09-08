import type { IClient, TApps, TCredential, TOptions } from "../types";

import { App } from "./app";
import { CmsApp } from "./cms.app";
import { CrmApp } from "./crm.app";
import { PimApp } from "./pim.app";

export class Client extends App implements IClient {
    readonly #apps: Map<keyof TApps, TApps[keyof TApps]> = new Map();

    /**
     * Initialize Rego ERP client instance
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

    use<T extends keyof TApps = "CMS" | "CRM" | "PIM">(domain: T): TApps[T] {
        try {
            const app = this.#apps.get(domain);

            return {
                CMS: (() => {
                    const tmpApp =
                        !app || !(app instanceof CmsApp)
                            ? new CmsApp(this.params)
                            : app;

                    this.#apps.set(domain, tmpApp);
                    return tmpApp;
                })(),
                CRM: (() => {
                    const tmpApp =
                        !app || !(app instanceof CrmApp)
                            ? new CrmApp(this.params)
                            : app;

                    this.#apps.set(domain, tmpApp);
                    return tmpApp;
                })(),
                PIM: (() => {
                    const tmpApp =
                        !app || !(app instanceof PimApp)
                            ? new PimApp(this.params)
                            : app;

                    this.#apps.set(domain, tmpApp);
                    return tmpApp;
                })()
            }[domain];
        } catch (error) {
            if (this.params.options?.logs) {
                console.error(`[${this.appName}] App init got problem:`, error);
            }

            throw error;
        }
    }
}
