import type {
    TData,
    TFullData,
    TMetadata,
    TRoute,
    TStaticData
} from "../validators";

export type TMedataKeys =
    | "title"
    | "description"
    | "keywords"
    | "canonical"
    | "ogType"
    | "ogTitle"
    | "ogDescription"
    | "ogImage"
    | "ogUrl";

export interface IRegoProvider {
    routes: Array<TRoute> | undefined;
    staticData: TStaticData;
    data: TData;
    metadata: TMetadata;

    fetchRoute(
        payload:
            | {
                  origin: string;
                  pathname: string;
                  search: string;
                  cache?: boolean;
              }
            | {
                  url: URL;
                  cache?: boolean;
              }
    ): Promise<Readonly<TFullData> | undefined>;
    setMetadataToElement(
        key: TMedataKeys,
        value: string | null | undefined
    ): void;
    inferMetadata(payload: Record<string, string | null | undefined>): void;
}
