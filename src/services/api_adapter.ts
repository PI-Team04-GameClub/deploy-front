/**
 * ADAPTER PATTERN - STRUCTURAL
 * Omogućuje suradnju nekompatibilnih sučelja
 * 
 * Kada koristiti:
 * • Integracija legacy koda
 * • Korištenje vanjskih biblioteka
 * • Nekompatibilna sučelja
 * 
 * Primjer: Različiti API-ji koriste različite strukture podataka
 * Adapter ih čini kompatibilnima
 */

import logger from "./logger";

/**
 * Novo sučelje koje aplikacija koristi
 */
export interface GameData {
  id: number;
  title: string;
  players: Player[];
  status: "active" | "inactive";
  createdAt: string;
}

export interface Player {
  id: number;
  name: string;
  score: number;
}

/**
 * Staro sučelje - Legacy API (npr. stari backend)
 * Koristi drugačije nazive i strukturu
 */
export interface LegacyGameData {
  game_id: number;
  game_name: string;
  player_list: LegacyPlayer[];
  is_active: boolean;
  creation_date: string;
}

export interface LegacyPlayer {
  player_id: number;
  player_name: string;
  player_score: number;
}

/**
 * ADAPTER - Pretvara legacy podatke u novi format
 */
export class LegacyGameAdapter {
  /**
   * Pretvara legacy igru u novo sučelje
   */
  public adaptGame(legacyGame: LegacyGameData): GameData {
    logger.info(`Adaptiranje legacy igre: ${legacyGame.game_name}`);

    const adaptedGame: GameData = {
      id: legacyGame.game_id,
      title: legacyGame.game_name,
      players: legacyGame.player_list.map((player) =>
        this.adaptPlayer(player)
      ),
      status: legacyGame.is_active ? "active" : "inactive",
      createdAt: legacyGame.creation_date,
    };

    logger.info(`Igra uspješno adaptirana: ${adaptedGame.title}`);
    return adaptedGame;
  }

  /**
   * Pretvara legacy igrača u novo sučelje
   */
  private adaptPlayer(legacyPlayer: LegacyPlayer): Player {
    return {
      id: legacyPlayer.player_id,
      name: legacyPlayer.player_name,
      score: legacyPlayer.player_score,
    };
  }

  /**
   * Pretvara novu igru u legacy format (obrnuto)
   */
  public adaptToLegacy(game: GameData): LegacyGameData {
    logger.info(`Konverzija u legacy format: ${game.title}`);

    const legacyGame: LegacyGameData = {
      game_id: game.id,
      game_name: game.title,
      player_list: game.players.map((player) =>
        this.adaptPlayerToLegacy(player)
      ),
      is_active: game.status === "active",
      creation_date: game.createdAt,
    };

    logger.info(`Konverzija uspješna`);
    return legacyGame;
  }

  /**
   * Pretvara novog igrača u legacy format
   */
  private adaptPlayerToLegacy(player: Player): LegacyPlayer {
    return {
      player_id: player.id,
      player_name: player.name,
      player_score: player.score,
    };
  }
}

/**
 * ADAPTER - Za različite API klijente
 * Primjer: Stariji API koristi drugačije nazive metoda
 */
export interface ModernAPIClient {
  fetchGame(id: number): Promise<GameData>;
  saveGame(game: GameData): Promise<void>;
  deleteGame(id: number): Promise<void>;
}

/**
 * Legacy API - Stare metode
 */
export interface OldAPIClient {
  get_game(game_id: number): Promise<LegacyGameData>;
  post_game(game_data: LegacyGameData): Promise<void>;
  remove_game(game_id: number): Promise<void>;
}

/**
 * ADAPTER - Čini stariji API kompatibilnim sa novim sučeljem
 */
export class OldAPIAdapter implements ModernAPIClient {
  constructor(private oldClient: OldAPIClient) {
    logger.info("OldAPIAdapter inicijaliziran");
  }

  async fetchGame(id: number): Promise<GameData> {
    logger.info(`Dohvaćanje igre preko adaptera: ID ${id}`);

    // Koristi stariju metodu
    const legacyGame = await this.oldClient.get_game(id);

    // Adaptira na novo sučelje
    const adapter = new LegacyGameAdapter();
    const modernGame = adapter.adaptGame(legacyGame);

    logger.info(`Igra uspješno dohvaćena i adaptirana`);
    return modernGame;
  }

  async saveGame(game: GameData): Promise<void> {
    logger.info(`Spremanje igre preko adaptera: ${game.title}`);

    // Konvertuj u legacy format
    const adapter = new LegacyGameAdapter();
    const legacyGame = adapter.adaptToLegacy(game);

    // Koristi staru metodu
    await this.oldClient.post_game(legacyGame);

    logger.info(`Igra uspješno spremljena`);
  }

  async deleteGame(id: number): Promise<void> {
    logger.info(`Brisanje igre preko adaptera: ID ${id}`);

    // Koristi staru metodu
    await this.oldClient.remove_game(id);

    logger.info(`Igra uspješno obrisana`);
  }
}

/**
 * ADAPTER - Za različite formate podataka
 * Primjer: CSV → JSON → XML
 */
export class DataFormatAdapter {
  /**
   * Pretvara CSV u JSON
   */
  static csvToJson(csvData: string): GameData[] {
    logger.info("Pretvaranje CSV u JSON");

    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const games: GameData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",");
      const game: GameData = {
        id: parseInt(values[0]),
        title: values[1],
        players: [],
        status: values[2] as "active" | "inactive",
        createdAt: values[3],
      };

      games.push(game);
    }

    logger.info(`${games.length} igre konvertirane iz CSV-a`);
    return games;
  }

  /**
   * Pretvara JSON u CSV
   */
  static jsonToCsv(games: GameData[]): string {
    logger.info("Pretvaranje JSON u CSV");

    const headers = ["id", "title", "status", "createdAt"];
    let csv = headers.join(",") + "\n";

    for (const game of games) {
      csv += `${game.id},${game.title},${game.status},${game.createdAt}\n`;
    }

    logger.info(`${games.length} igre konvertirane u CSV`);
    return csv;
  }
}
