import type { ArtistRepository } from "../repositories/artist";

export class ArtistService {
    constructor(private repository: ArtistRepository) {}

    async findArtists() {
        return await this.repository.findArtists({});
    }
}
