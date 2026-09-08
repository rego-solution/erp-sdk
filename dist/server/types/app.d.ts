export type TCredential = {
    workspaceId: string;
    appId: string;
    secret: string;
};
export type TOptions = {
    version?: number;
    logs?: boolean;
};
export interface IApp {
    signToken(): Promise<string>;
}
