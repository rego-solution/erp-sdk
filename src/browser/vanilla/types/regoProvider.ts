import type { TRoute } from "../validators";

export interface IRegoProvider {
    getRoutes(): Array<TRoute> | undefined;
}
