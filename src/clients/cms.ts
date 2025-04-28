import { createClient } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.SERVICE_DOMAIN,
    apiKey: import.meta.env.API_KEY as string,
});

type CmsFetchOption = { orders?: string; filters?: string };

export class CmsClient {
    constructor(private endpoint: string) {}

    async getALLContents(fields: string, options: CmsFetchOption = {}) {
        return await client.getAllContents({
            endpoint: this.endpoint,
            queries: {
                fields,
                filters: options.filters,
                orders: options.orders,
            },
        });
    }

    async findContents(fields: string, options: CmsFetchOption & { limit: number; offset: number }) {
        const res = await client.getList({
            endpoint: this.endpoint,
            queries: {
                fields,
                filters: options.filters,
                orders: options.orders,
                limit: options.limit,
                offset: options.offset,
            },
        });

        return {
            contents: res.contents,
            total: res.totalCount,
        };
    }
}
