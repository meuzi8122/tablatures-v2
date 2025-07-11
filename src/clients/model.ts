export type Artist = {
    id: string;
    name: string;
    imageUrl?: string;
};

export type Tablature = {
    id: string;
    title: string;
    artist: Artist;
    instrument: string;
    url: string;
    artworkUrl?: string;
};

export type TablatureDetail = Tablature & {
    source: string; // 配信元サイト（Youtube, songsterなど）
    note: string;
};
