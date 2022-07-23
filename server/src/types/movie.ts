export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: Genere[];
  id: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  status: string;
  collection?: {
    id: string;
    name: string;
  };
  runtime: number;
}

export interface Genere {
  id: string;
  name: string;
}
