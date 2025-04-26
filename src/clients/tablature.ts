import { CmsClient } from "./cms";
import type { Tablature } from "./model";

export class TablatureClient {
    private static endpoint = "tablatures";

    static async getALLTablatures(): Promise<Tablature[]> {
        const contents = await new CmsClient(this.endpoint).getALLContents(
            "id,title,artist.id,artist.name,instrument,url,artworkUrl",
            "title",
        );
        return contents.map((content) => this.parseTablature(content));
    }

    static async findTablatures(keyword: string): Promise<Tablature[]> {
        throw Error("Not Implemented");
    }

    private static parseTablature(content: any): Tablature {
        return { ...content, instrument: content.instrument[0] };
    }
}
