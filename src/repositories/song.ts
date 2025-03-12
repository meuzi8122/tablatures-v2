import { cmsClient } from "../cms";
import type { Song, Tablature } from "../entity";

type SongSearchQuery = {
    artistId?: string;
    orderBy?: {
        name: string;
        desc: boolean;
    };
    limit?: number;
};

export interface SongRepository {
    findSongs(query: SongSearchQuery): Promise<Song[]>;
}

export class CmsSongRepository implements SongRepository {
    private endpoint = "songs";

    async findSongs(queries: SongSearchQuery): Promise<Song[]> {
        let filters: string[] = [];
        let orders: string = "title";

        if (queries.artistId) {
            filters.push(`artist[equals]${queries.artistId}`);
        }

        if (queries.orderBy) {
            orders = queries.orderBy.desc ? `-${queries.orderBy.name}` : queries.orderBy.name;
        }

        const _queries = {
            fields: "id,title,artist.id,artist.name,tablatures,artworkUrl",
            filters: filters.join("[AND]"),
            orders,
        };

        let contents = [];

        if (queries.limit) {
            contents = (
                await cmsClient.getList({
                    endpoint: this.endpoint,
                    queries: { ..._queries, limit: queries.limit },
                })
            ).contents;
        } else {
            contents = await cmsClient.getAllContents({
                endpoint: this.endpoint,
                queries: _queries,
            });
        }

        return contents.map((content) => ({
            ...content,
            tablatures: new Map(content.tablatures.map((tablature: Tablature) => [tablature.instrument[0], tablature])),
        }));
    }
}
