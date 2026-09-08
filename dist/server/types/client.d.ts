import type { IApp } from "./app";
import type { ICmsApp } from "./cms.app";
import type { ICrmApp } from "./crm.app";
import type { IPimApp } from "./pim.app";
export type TApps = {
    CMS: ICmsApp;
    CRM: ICrmApp;
    PIM: IPimApp;
};
export type TDomains = "CMS" | "CRM" | "PIM";
export interface IClient extends IApp {
    use<T extends keyof TApps = "CMS" | "CRM" | "PIM">(domain: T): TApps[T];
}
