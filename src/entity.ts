export type Artist = {
    id: string;
    name: string;
};

export type Song = {
    id: string;
    title: string;
    artist: Artist;
    tablature: Tablature;
    artworkUrl?: string;
};

export type Tablature = {
    id: string;
    instrument: string;
    link: string;
};
