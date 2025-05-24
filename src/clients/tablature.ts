import { ArtistClient } from "./artist";
import { CmsClient } from "./cms";
import type { Tablature, TablatureDetail } from "./model";

export class TablatureClient {
    private static endpoint = "tablatures";

    static async getALLTablatures(): Promise<Tablature[]> {
        const contents = await new CmsClient(this.endpoint).findContents({
            fields: "id,title,artist.id,artist.name,instrument,url,artworkUrl",
            orders: "title",
        });
        return contents.map((content) => this.parseTablature(content));
    }

    static async getAllTablatureDetails(): Promise<TablatureDetail[]> {
        const contents = await new CmsClient(this.endpoint).findContents({
            fields: "id,title,artist.id,artist.name,instrument,url,artworkUrl,source,note",
        });
        return contents.map((content) => this.parseTablatureDetail(content));
    }

    static async findTablatures(keyword: string): Promise<Tablature[]> {
        const artistIds = await ArtistClient.findArtistIds(keyword);

        const cmsClient = new CmsClient(this.endpoint);
        const fields = "id,title,artist.id,artist.name,instrument,url,artworkUrl";

        const tablatures1 = (
            await Promise.all([
                ...artistIds.map((artistId) =>
                    cmsClient.findContents({
                        fields,
                        filters: `artist[equals]${artistId}`,
                    }),
                ),
            ])
        ).flatMap((contents) => (contents ? contents.map((content) => this.parseTablature(content)) : []));

        const tablatures1Ids = tablatures1.map((tablature) => tablature.id);

        const tablatures2 = (
            await cmsClient.findContents({
                fields,
                filters: `title[contains]${keyword}`,
            })
        ).flatMap((content) => (tablatures1Ids.includes(content.id) ? [] : this.parseTablature(content)));

        return [...tablatures1, ...tablatures2];
    }

    /* TODO: zodでレスポンスをバリデーションする？ */

    private static parseTablature(content: any): Tablature {
        return {
            id: content.id,
            title: content.title,
            artist: content.artist,
            url: content.url,
            instrument: content.instrument[0],
        };
    }

    private static parseTablatureDetail(content: any): TablatureDetail {
        return { ...this.parseTablature(content), source: content.source || "サイト名不明", note: content.note || "" };
    }
}
