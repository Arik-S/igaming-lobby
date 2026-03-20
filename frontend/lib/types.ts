export interface Provider {
  id: number;
  name: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  thumbnail?: string;
  provider: Provider;
  category: Category;
}

export interface LobbySession {
  id: number;
  name: string;
  order: number;
  games: Game[];
}
