import type { TData, TFullData, TMetadata, TRoute, TStaticData } from "../validators";
export interface IRegoProvider {
    routes: Array<TRoute> | undefined;
    staticData: TStaticData;
    data: TData;
    metadata: TMetadata;
    fetchRoute(payload: {
        origin: string;
        pathname: string;
        search: string;
        cache?: boolean;
    } | {
        url: URL;
        cache?: boolean;
    }): Promise<Readonly<TFullData> | undefined>;
}
