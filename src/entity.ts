export type Artist = {
    id: string;
    name: string;
};

type Instrument = string;

export type Song = {
    id: string;
    title: string;
    artist: Artist;
    tablatures: Map<Instrument, Tablature>;
    artworkUrl?: string;
};

export type Tablature = {
    id: string;
    instrument: string;
    link: string;
};
