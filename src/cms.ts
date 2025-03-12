import { createClient } from "microcms-js-sdk";

export const cmsClient = createClient({
    serviceDomain: import.meta.env.SERVICE_DOMAIN,
    apiKey: import.meta.env.API_KEY as string,
});
