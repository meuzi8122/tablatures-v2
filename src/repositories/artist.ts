import { cmsClient } from "../cms";
import type { Artist } from "../entity";

export type ArtistSearchQuery = {};

export interface ArtistRepository {
    findArtists(query: ArtistSearchQuery): Promise<Artist[]>;
}

export class CmsArtistRepository implements ArtistRepository {
    private endpoint = "artists";

    async findArtists(query: ArtistSearchQuery): Promise<Artist[]> {
        return await cmsClient.getAllContents({
            endpoint: this.endpoint,
            queries: {
                fields: "id,name",
            },
        });
    }
}
