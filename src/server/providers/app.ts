import type { IApp, TCredential, TOptions } from "../types";

import { SignJWT } from "jose";

export class App implements IApp {
    protected appName = "Rego ERP SDK";
    protected defaultVersion: number = 1;
    protected token?: string;

    /**
     * Initialize Rego ERP client instance
     * @param configs
     * @param options
     */
    constructor(
        protected readonly params: Readonly<{
            credential: TCredential;
            options?: TOptions;
        }>
    ) {}

    /**
     * Sign JWT token with Ed25519 algorithm
     * @returns
     */
    async signToken() {
        const {
            params: {
                credential: { workspaceId, appId, secret },
                options
            }
        } = this;

        try {
            const rawKey = new Uint8Array(Buffer.from(secret, "base64"));

            const privateKey = await crypto.subtle.importKey(
                "raw",
                rawKey,
                { name: "HMAC", hash: "SHA-512" },
                false,
                ["sign", "verify"]
            );

            const jwt = await new SignJWT({
                iss: workspaceId,
                aud: appId
            })
                .setProtectedHeader({ alg: "HS512" })
                .sign(privateKey);

            this.token = jwt;

            return jwt;
        } catch (error) {
            if (options?.logs) {
                console.error(`[${this.appName}] Sign token error:`, error);
            }

            throw error;
        }
    }
}
