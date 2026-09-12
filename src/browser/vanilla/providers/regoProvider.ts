import type { IRegoProvider } from "../types";

import { Enums } from "../constants";
import {
    dataSchema,
    fullDataSchema,
    metadataSchema,
    routeSchema,
    staticDataSchema
} from "../validators";

export class RegoProvider implements IRegoProvider {
    #routes: IRegoProvider["routes"];
    #staticDatas: Map<string, IRegoProvider["staticData"]> = new Map();
    #datas: Map<string, IRegoProvider["data"]> = new Map();
    #metadatas: Map<string, IRegoProvider["metadata"]> = new Map();

    constructor(private readonly window: Window) {
        this.#parseRoutes();
        this.#parseMetadata();
        this.#parseStaticData();
        this.#parseData();
    }

    #parseRoutes() {
        const scriptElement = this.window.document.body.querySelector(
            `script#${Enums.EScriptIds.routes}[type="application/json"]`
        );

        if (!scriptElement) {
            return;
        }

        try {
            const jsonString = scriptElement.textContent.trim();
            const parsedData = JSON.parse(jsonString);

            if (!Array.isArray(parsedData)) {
                return;
            }

            this.#routes = parsedData
                .map((route) => {
                    const validation = routeSchema.safeParse(route);
                    return !validation.success ? null : validation.data;
                })
                .filter((route) => !!route);
        } catch (error) {
            console.error("Error on parse routes:", error);
            return;
        }
    }

    #parseStaticData() {
        const scriptElement = this.window.document.body.querySelector(
            `script#${Enums.EScriptIds.staticData}[type="application/json"]`
        );

        if (!scriptElement) {
            return;
        }

        try {
            const { pathname, search } = this.window.location;
            const jsonString = scriptElement.textContent.trim();
            const parsedData = JSON.parse(jsonString);
            const validation = staticDataSchema.safeParse(parsedData);

            if (!validation.success) {
                return;
            }

            this.#staticDatas.set(`${pathname}${search}`, validation.data);
        } catch (error) {
            console.error("Error on parse static data:", error);
            return;
        }
    }

    #parseData() {
        const scriptElement = this.window.document.body.querySelector(
            `script#${Enums.EScriptIds.data}[type="application/json"]`
        );

        if (!scriptElement) {
            return;
        }

        try {
            const { pathname, search } = this.window.location;
            const jsonString = scriptElement.textContent.trim();
            const parsedData = JSON.parse(jsonString);
            const validation = dataSchema.safeParse(parsedData);

            if (!validation.success) {
                return;
            }

            this.#datas.set(`${pathname}${search}`, validation.data);
        } catch (error) {
            console.error("Error on parse data:", error);
            return;
        }
    }

    #parseMetadata() {
        const scriptElement = this.window.document.body.querySelector(
            `script#${Enums.EScriptIds.metadata}[type="application/json"]`
        );

        if (!scriptElement) {
            return;
        }

        try {
            const { pathname, search } = this.window.location;
            const jsonString = scriptElement.textContent.trim();
            const parsedData = JSON.parse(jsonString);
            const validation = metadataSchema.safeParse(parsedData);

            if (!validation.success) {
                return;
            }

            this.#metadatas.set(`${pathname}${search}`, validation.data);
        } catch (error) {
            console.error("Error on parse metadata:", error);
            return;
        }
    }

    async fetchRoute({
        cache,
        ...payload
    }: Parameters<IRegoProvider["fetchRoute"]>[number]): ReturnType<
        IRegoProvider["fetchRoute"]
    > {
        const uri =
            "url" in payload
                ? `${payload.url.pathname}${payload.url.search}`
                : `${payload.pathname}${payload.search}`;

        if (cache) {
            const data = this.#datas.get(uri),
                metadata = this.#metadatas.get(uri),
                staticData = this.#staticDatas.get(uri);

            if (data && metadata && staticData) {
                return Object.freeze({
                    data,
                    metadata,
                    staticData
                });
            }
        }

        try {
            const requestHeaders = new Headers();

            requestHeaders.append("x-requested-with", "XMLHttpRequest");
            requestHeaders.append("content-type", "application/json");

            const response = await fetch(`${origin}${uri}`, {
                method: "GET",
                headers: requestHeaders
            });

            if (!response.ok) {
                throw new Error(`Can not fetch data [${uri}]`);
            }

            const parsedData = await response.json();
            const validation = fullDataSchema.safeParse(parsedData);

            if (!validation.success) {
                throw validation.error;
            }

            this.#datas.set(uri, validation.data.data);
            this.#metadatas.set(uri, validation.data.metadata);
            this.#staticDatas.set(uri, validation.data.staticData);

            return Object.freeze(validation.data);
        } catch (error) {
            console.error("Error on fetch full route data:", error);
            return;
        }
    }

    get routes() {
        return this.#routes;
    }

    get staticData() {
        const { pathname, search } = this.window.location;
        return this.#staticDatas.get(`${pathname}${search}`);
    }

    get data() {
        const { pathname, search } = this.window.location;
        return this.#datas.get(`${pathname}${search}`);
    }

    get metadata() {
        const { pathname, search } = this.window.location;
        return this.#metadatas.get(`${pathname}${search}`);
    }
}
