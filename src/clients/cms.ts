import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.SERVICE_DOMAIN,
    apiKey: import.meta.env.API_KEY as string,
});

export class CmsClient {
    constructor(private endpoint: string) {}

    async getALLContents(fields: string, filters?: string) {
        return await client.getAllContents({
            endpoint: this.endpoint,
            queries: {
                fields,
                filters,
            },
        });
    }
}
