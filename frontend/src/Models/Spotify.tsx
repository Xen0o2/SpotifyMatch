interface PaginTracks {
	items: Track[];
}

export interface Track {
	id: string;
	name: string;
	preview_url: string | null;
	duration_ms: number;
	artists: Artist[]
	album?: Album;
}

export interface Artist {
	id: string;
	name: string;
	genres?: string[];
	images?: Image[]
	followers?: Followers
}

export interface Album {
	id: string;
	name: string;
	album_type?: string;
	release_date?: string;
	total_tracks?: number;
	images: Image[]
	artists?: Artist[];
	tracks?: PaginTracks;
}

export interface Image {
	height?: number;
	width?: number;
	url: string;
}

interface Followers {
	href?: string;
	total: number;
}