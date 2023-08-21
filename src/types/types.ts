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
    src: string;
    compressedSrc: string;
    description: string;
    fileName: string;
}
