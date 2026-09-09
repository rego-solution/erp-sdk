import type { IRegoProvider } from "../types";
export declare class RegoProvider implements IRegoProvider {
    private readonly document;
    constructor(document: Document);
    getRoutes(): ReturnType<IRegoProvider["getRoutes"]>;
}
