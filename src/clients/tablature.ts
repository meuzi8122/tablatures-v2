import { CmsClient } from "./cms";
import type { Tablature, TablatureDetail } from "./model";

export class TablatureClient {
    private static endpoint = "tablatures";

    static async getALLTablatures(): Promise<Tablature[]> {
        const contents = await new CmsClient(this.endpoint).getALLContents(
            "id,title,artist.id,artist.name,instrument,url,artworkUrl",
            { orders: "title" },
        );
        return contents.map((content) => this.parseTablature(content));
    }

    static async getAllTablatureDetails(): Promise<TablatureDetail[]> {
        const contents = await new CmsClient(this.endpoint).getALLContents(
            "id,title,artist.id,artist.name,instrument,url,artworkUrl,author,source",
        );
        return contents.map((content) => this.parseTablatureDetail(content));
    }

    static async findTablatures(keyword: string): Promise<Tablature[]> {
        const contents = await new CmsClient(this.endpoint).findContents(
            "id,title,artist.id,artist.name,instrument,url,artworkUrl",
            {
                filters: `title[contains]${keyword}`,
                limit: 10,
                offset: 0,
            },
        );
        return contents.map((content) => this.parseTablature(content));
    }

    /* TODO: zodでレスポンスをバリデーションする？ */

    private static parseTablature(content: any): Tablature {
        return { ...content, instrument: content.instrument[0] };
    }

    private static parseTablatureDetail(content: any): TablatureDetail {
        return this.parseTablature(content);
    }
}
