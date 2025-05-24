import { CmsClient } from "./cms";
import type { Artist } from "./model";

export class ArtistClient {
    private static endpoint = "artists";

    static async getALLArtists(): Promise<Artist[]> {
        return await new CmsClient(this.endpoint).findContents({ fields: "id,name", orders: "name" });
    }

    static async findArtistIds(keyword: string): Promise<string[]> {
        return (
            await new CmsClient(this.endpoint).findContents({ fields: "id", filters: `name[contains]${keyword}` })
        ).map((content) => content.id);
    }
}
