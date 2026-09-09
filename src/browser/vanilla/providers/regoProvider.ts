import type { IRegoProvider } from "../types";

import { Enums } from "../constants";
import { routeSchema } from "../validators";

export class RegoProvider implements IRegoProvider {
    constructor(private readonly document: Document) {}

    getRoutes(): ReturnType<IRegoProvider["getRoutes"]> {
        const scriptElement = this.document.querySelector(
            `script#${Enums.EScriptIds.routesId}[type="application/json"]`
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

            return parsedData
                .map((route) => {
                    const validation = routeSchema.safeParse(route);
                    return !validation.success ? null : validation.data;
                })
                .filter((route) => !!route);
        } catch (error) {
            console.error("Error on parse JSON:", error);
            return;
        }
    }
}
