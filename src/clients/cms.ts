import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.SERVICE_DOMAIN,
    apiKey: import.meta.env.API_KEY,
});

type CmsQuery = {
    fields: string;
    orders?: string;
    filters?: string;
    limit?: number;
};

export class CmsClient {
    constructor(private endpoint: string) {}

    async findContents(queries: CmsQuery) {
        return await client.getAllContents({ endpoint: this.endpoint, queries });
    }
}
