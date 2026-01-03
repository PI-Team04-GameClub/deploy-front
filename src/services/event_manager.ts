/**
 * OBSERVER PATTERN - BEHAVIORAL
 * Obavještava pretplaćene objekte (subscribers) o promjenama
 * 
 * Kada koristiti:
 * • Publish-subscribe scenariji
 * • Event handling sustavi
 * • Reaktivne aplikacije
 */

import logger from "./logger";

/**
 * Sučelje za Observer - svaki observer mora implementirati update metodu
 */
interface Observer {
  update(eventType: string, data: any): void;
}

/**
 * Tipovi događaja koji se mogu observirati
 */
export enum EventType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
  GAME_CREATED = "GAME_CREATED",
  GAME_DELETED = "GAME_DELETED",
  TOURNAMENT_UPDATED = "TOURNAMENT_UPDATED",
  NOTIFICATION = "NOTIFICATION",
  ERROR = "ERROR",
}

/**
 * Subject - klasa koja upravlja observerima
 * Ovo je singleton pattern koji se koristi zajedno sa observer patternsom
 */
class EventManager implements Observer {
  private static instance: EventManager;
  private observers: Map<string, Observer[]> = new Map();
  private eventHistory: Array<{ type: string; data: any; timestamp: string }> = [];

  private constructor() {
    logger.info("EventManager inicijaliziran");
  }

  /**
   * Dohvaća jedinu instancu EventManager-a (Singleton)
   */
  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  /**
   * Registrira observer za određeni tip događaja
   */
  public subscribe(eventType: string, observer: Observer): void {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
    logger.info(`Observer registriran za događaj: ${eventType}`);
  }

  /**
   * Uklanja observer iz određenog tipa događaja
   */
  public unsubscribe(eventType: string, observer: Observer): void {
    if (!this.observers.has(eventType)) return;

    const observers = this.observers.get(eventType)!;
    const index = observers.indexOf(observer);
    if (index > -1) {
      observers.splice(index, 1);
      logger.info(`Observer obrisan iz događaja: ${eventType}`);
    }
  }

  /**
   * Emituje događaj i obavještava sve pretplaćene observere
   */
  public emit(eventType: string, data: any): void {
    logger.info(`Emitovanje događaja: ${eventType}`);

    // Sprema u историju
    this.eventHistory.push({
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    });

    if (!this.observers.has(eventType)) {
      logger.warn(`Nema observera za događaj: ${eventType}`);
      return;
    }

    const observers = this.observers.get(eventType)!;
    observers.forEach((observer) => {
      try {
        observer.update(eventType, data);
      } catch (error) {
        logger.error(`Greška kod obavještavanja observera: ${error}`);
      }
    });
  }

  /**
   * Dohvaća sve registrirane observere za tip događaja
   */
  public getObservers(eventType: string): Observer[] {
    return this.observers.get(eventType) || [];
  }

  /**
   * Dohvaća historiju događaja
   */
  public getEventHistory(): Array<{ type: string; data: any; timestamp: string }> {
    return [...this.eventHistory];
  }

  /**
   * Čisti historiju događaja
   */
  public clearHistory(): void {
    this.eventHistory = [];
    logger.info("Historija događaja obrisana");
  }

  /**
   * Implementacija Observer sučelja (za recenzivnu observiranje)
   */
  public update(eventType: string, data: any): void {
    logger.debug(`EventManager primio događaj: ${eventType}`);
  }
}

/**
 * Konkretna klasa koja observira specifične događaje
 * Primjer: Komponenta za obavijesti
 */
export class NotificationObserver implements Observer {
  constructor(private name: string = "NotificationObserver") {}

  public update(eventType: string, data?: any): void {
    const message = `[${this.name}] Primljen događaj: ${eventType} - ${JSON.stringify(data)}`;
    logger.info(message);
    console.log(`🔔 ${message}`);
  }
}

/**
 * Konkretna klasa koja observira sve što se dogodi s korisnikom
 */
export class UserActivityObserver implements Observer {
  constructor(private name: string = "UserActivityObserver") {}

  public update(eventType: string, _data?: any): void {
    if (eventType.includes("USER") || eventType.includes("LOGIN")) {
      logger.info(`[${this.name}] Korisnikova aktivnost: ${eventType}`);
      console.log(`👤 Korisnik aktivnost: ${eventType}`);
    }
  }
}

/**
 * Konkretna klasa koja observira igre
 */
export class GameObserver implements Observer {
  constructor(private name: string = "GameObserver") {}

  public update(eventType: string, _data?: any): void {
    if (eventType.includes("GAME")) {
      logger.info(`[${this.name}] Igra događaj: ${eventType}`);
      console.log(`🎮 Igra događaj: ${eventType}`);
    }
  }
}

/**
 * Konkretna klasa koja observira greške
 */
export class ErrorObserver implements Observer {
  constructor(private name: string = "ErrorObserver") {}

  public update(eventType: string, data: any): void {
    if (eventType === EventType.ERROR) {
      logger.error(`[${this.name}] GREŠKA: ${JSON.stringify(data)}`);
      console.error(`❌ Greška: ${data.message}`);
    }
  }
}

// Exporta Event Manager kao singleton
export default EventManager.getInstance();
