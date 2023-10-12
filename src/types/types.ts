export interface Event {
    id: number;
    name: string;
    frequency: string;
    description: string;
    images: Image[];
}

export interface Member {
    id: number;
    name: string;
    roles: string[];
    pfp: Image;
}

export interface Image {
    id: string;
    src: string;
    compressedSrc: string;
    description: string;
    fileName: string;
}

export interface Stat {
    id: string;
    item: string;
    count: number;
}
