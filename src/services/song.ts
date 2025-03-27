import type { Song } from "../entity";
import type { SongRepository } from "../repositories/song";

export class SongService {
    constructor(private songRepository: SongRepository) {}

    async findSongsByArtist(artistId: string): Promise<Song[]> {
        return await this.songRepository.findSongs({ artistId });
    }

    async findLatestSongs(): Promise<Song[]> {
        return await this.songRepository.findSongs({ orderBy: { name: "title", desc: true }, limit: 5 });
    }
}
