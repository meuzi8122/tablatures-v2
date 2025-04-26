import { CmsClient } from "./cms";
import type { Artist } from "./model";

export class ArtistClient {
    private static endpoint = "artists";

    static async getALLArtists(): Promise<Artist[]> {
        return await new CmsClient(this.endpoint).getALLContents("id,name");
    }
}
