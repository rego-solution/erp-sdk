import type { ICmsApp, TApiResponse, TCredential, TOptions } from "../types";

import { Variables } from "../constants";
import { App } from "./app";

export class CmsApp extends App implements ICmsApp {
    #blueprintId?: string;

    /**
     * Initialize Rego ERP CMS app instance
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

    register(
        payload: Parameters<ICmsApp["register"]>[number]
    ): ReturnType<ICmsApp["register"]> {
        if (payload?.blueprintId) {
            this.#blueprintId = payload.blueprintId;
        }

        return this;
    }

    async getRoutes(): ReturnType<ICmsApp["getRoutes"]> {
        const {
            params: {
                credential: { workspaceId, appId },
                options
            }
        } = this;

        try {
            if (!this.#blueprintId) {
                throw new Error("Missing blueprint ID!");
            }

            const authToken = this.token || (await this.signToken());
            const requestHeaders = new Headers();

            requestHeaders.append("X-Workspace-ID", workspaceId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);
            requestHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                `${Variables.baseUri}/cms/v${
                    options?.version || this.defaultVersion
                }/blueprints/${this.#blueprintId}`,
                {
                    method: "GET",
                    headers: requestHeaders
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const { data } = (await response.json()) as TApiResponse<
                ICmsApp["getRoutes"]
            >;

            return Object.freeze({
                hostname: data?.hostname || null,
                routes: data?.routes || null,
                data: data?.data
            });
        } catch (error) {
            if (options?.logs) {
                console.error("[CMS] get blueprint routes:", error);
            }

            throw error;
        }
    }
}
