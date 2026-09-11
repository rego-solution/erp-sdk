import type { output } from "zod";

import { object } from "zod";
import { dataSchema } from "./data";
import { metadataSchema } from "./metadata";
import { staticDataSchema } from "./staticData";

export const fullDataSchema = object({
    metadata: metadataSchema,
    data: dataSchema,
    staticData: staticDataSchema
});

export type TFullData = output<typeof fullDataSchema>;
