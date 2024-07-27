export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
}

export interface MovieData {
    movies: Movie[];
    genres: string[];
}