import { CmsClient } from "./cms";
import type { Tablature } from "./model";

export class SongClient {
    private static endpoint = "songs";

    static async findSongsByArtist(artistId: string): Promise<Tablature[]> {
        const contents = await new CmsClient(this.endpoint).findContents(
            `artist[equals]${artistId}`,
            "id,title,artist.id,artist.name,instrument,link",
        );

        return contents.map((content) => ({ ...content, instrument: content.instrument[0] }));
    }
}
