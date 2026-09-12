import type { IRegoProvider, TMedataKeys } from "../types";

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
    #metadataElements: Map<TMedataKeys, Element> = new Map();

    constructor(private readonly window: Window) {
        this.#findMetadataElements();
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

    #findMetadataElements() {
        const titleElement = this.window.document.head.querySelector("title"),
            descriptionElement = this.window.document.head.querySelector(
                'meta[name="description"]'
            ),
            keywordsElement = this.window.document.head.querySelector(
                'meta[name="keywords"]'
            ),
            canonicalElement = this.window.document.head.querySelector(
                'link[rel="canonical"]'
            ),
            ogTypeElement = this.window.document.head.querySelector(
                'meta[property="og:type"]'
            ),
            ogTitleElement = this.window.document.head.querySelector(
                'meta[property="og:title"]'
            ),
            ogDescriptionElement = this.window.document.head.querySelector(
                'meta[property="og:description"]'
            ),
            ogImageElement = this.window.document.head.querySelector(
                'meta[property="og:image"]'
            ),
            ogUrlElement = this.window.document.head.querySelector(
                'meta[property="og:url"]'
            );

        if (titleElement) this.#metadataElements.set("title", titleElement);
        if (descriptionElement)
            this.#metadataElements.set("description", descriptionElement);
        if (keywordsElement)
            this.#metadataElements.set("keywords", keywordsElement);
        if (canonicalElement)
            this.#metadataElements.set("canonical", canonicalElement);
        if (ogTypeElement) this.#metadataElements.set("ogType", ogTypeElement);
        if (ogTitleElement)
            this.#metadataElements.set("ogTitle", ogTitleElement);
        if (ogDescriptionElement)
            this.#metadataElements.set("ogDescription", ogDescriptionElement);
        if (ogImageElement)
            this.#metadataElements.set("ogImage", ogImageElement);
        if (ogUrlElement) this.#metadataElements.set("ogUrl", ogUrlElement);
    }

    setMetadataToElement(
        ...[key, value]: Parameters<IRegoProvider["setMetadataToElement"]>
    ) {
        switch (key) {
            case "title": {
                const titleElement = this.#metadataElements.get(key);

                (titleElement &&
                    "innerText" in titleElement &&
                    (titleElement.innerText = value?.trim())) ||
                    "";
                return;
            }

            case "description": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }

            case "keywords": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }

            case "canonical": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("href", value?.trim() || "");
                return;
            }

            case "ogType": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }

            case "ogDescription": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }

            case "ogImage": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }

            case "ogUrl": {
                this.#metadataElements
                    .get(key)
                    ?.setAttribute("content", value?.trim() || "");
                return;
            }
        }
    }

    inferMetadata(payload: Parameters<IRegoProvider["inferMetadata"]>[number]) {
        for (const [key, value] of Object.entries(payload)) {
            switch (key) {
                case "title": {
                    this.setMetadataToElement("title", value);
                    this.setMetadataToElement("ogTitle", value);
                    break;
                }
                case "description": {
                    this.setMetadataToElement("description", value);
                    this.setMetadataToElement("ogDescription", value);
                    break;
                }
                case "image": {
                    this.setMetadataToElement("ogImage", value);
                    break;
                }
                case "canonical": {
                    this.setMetadataToElement("canonical", value);
                    break;
                }
                case "url": {
                    this.setMetadataToElement("ogUrl", value);
                    break;
                }
                case "type": {
                    this.setMetadataToElement("ogType", value);
                    break;
                }
            }
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
                if (metadata) {
                    this.inferMetadata(metadata);
                }

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

            if (validation.data.metadata) {
                this.inferMetadata(validation.data.metadata);
            }

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
