# Design Patterns - GameClub Frontend

Ovo je dokumentacija implementacije tri design paterna za GameClub frontend aplikaciju.

## 📋 Sadržaj

1. [Singleton Pattern (Creational)](#singleton-pattern)
2. [Adapter Pattern (Structural)](#adapter-pattern)
3. [Observer Pattern (Behavioral)](#observer-pattern)
4. [Kako Koristiti](#kako-koristiti)

---

## Singleton Pattern

### 📁 Datoteka: `src/services/logger.ts`

**Što je Singleton?**
- Osigurava da postoji samo **jedna instanca** klase u cijeloj aplikaciji
- Pruža **globalni pristup** toj instanci
- Koristi se za kontrolu zajedničkih resursa

### Primjena u kodu:

```typescript
class Logger {
  private static instance: Logger;
  
  private constructor() {
    console.log("Logger se kreira samo jednom");
  }
  
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}

// Korištenje:
import logger from "../services/logger";

logger.info("Ovo je obavijest");
logger.error("Ovo je greška");
logger.warn("Ovo je upozorenje");
```

### Prednosti:
- ✅ Samo jedna instanca u memoriji
- ✅ Globalni pristup bez prosljeđivanja kao parametar
- ✅ Kontrola resursa (npr. bazena povezanosti)
- ✅ Lazy inicijalizacija

### Kada koristiti:
- 🎯 Logger sustavi
- 🎯 Database connection pool
- 🎯 Postavke aplikacije (Config)
- 🎯 Globalne servise

---

## Adapter Pattern

### 📁 Datoteka: `src/services/api_adapter.ts`

**Što je Adapter?**
- Omogućava suradnju **nekompatibilnih sučelja**
- Čini stari kod (legacy) kompatibilnim s novim
- "Prijevod" između različitih API-ja

### Primjena u kodu:

**Staro sučelje (Legacy):**
```typescript
interface LegacyGameData {
  game_id: number;
  game_name: string;
  player_list: LegacyPlayer[];
  is_active: boolean;
}
```

**Novo sučelje:**
```typescript
interface GameData {
  id: number;
  title: string;
  players: Player[];
  status: "active" | "inactive";
}
```

**Adapter - "Prijevod":**
```typescript
class LegacyGameAdapter {
  adaptGame(legacyGame: LegacyGameData): GameData {
    return {
      id: legacyGame.game_id,
      title: legacyGame.game_name,
      players: legacyGame.player_list.map(...),
      status: legacyGame.is_active ? "active" : "inactive"
    };
  }
}

// Korištenje:
const adapter = new LegacyGameAdapter();
const modernGame = adapter.adaptGame(legacyGame);
```

### Implementirani Adapteri:

1. **LegacyGameAdapter** - Pretvara legacy igre u novi format
2. **OldAPIAdapter** - Čini stariji API kompatibilnim
3. **DataFormatAdapter** - CSV ↔ JSON konverzija

### Prednosti:
- ✅ Integacija legacy koda
- ✅ Korištenje vanjskih biblioteka
- ✅ Kompatibilnost nekompatibilnih sučelja
- ✅ Ne trebaju izmjene originalnog koda

### Kada koristiti:
- 🎯 Integracija starog koda
- 🎯 External biblioteke
- 🎯 Format konverzije
- 🎯 API kompatibilnost

---

## Observer Pattern

### 📁 Datoteka: `src/services/event_manager.ts`

**Što je Observer?**
- **Publish-Subscribe** patern
- Objekti se registriraju (subscribe) da budu obaviješteni (update) kada se dogodi promjena
- Labava povezanost između komponenti

### Primjena u kodu:

**Observer sučelje:**
```typescript
interface Observer {
  update(eventType: string, data: any): void;
}
```

**Event tipovi:**
```typescript
enum EventType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
  GAME_CREATED = "GAME_CREATED",
  GAME_DELETED = "GAME_DELETED",
  // ... itd
}
```

**Subject - EventManager:**
```typescript
class EventManager {
  private static instance: EventManager; // Singleton + Observer = moć!
  private observers: Map<string, Observer[]> = new Map();
  
  subscribe(eventType: string, observer: Observer) {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
  }
  
  emit(eventType: string, data: any) {
    const observers = this.observers.get(eventType) || [];
    observers.forEach(obs => obs.update(eventType, data));
  }
}
```

**Konkretni Observeri:**
```typescript
class NotificationObserver implements Observer {
  update(eventType: string, data: any) {
    console.log(`🔔 Notifikacija: ${eventType}`);
  }
}

class UserActivityObserver implements Observer {
  update(eventType: string, data: any) {
    if (eventType.includes("USER")) {
      console.log(`👤 Korisnik aktivnost: ${eventType}`);
    }
  }
}
```

### Korištenje:
```typescript
import eventManager, { EventType } from "../services/event_manager";

// Registracija
const observer = new NotificationObserver();
eventManager.subscribe(EventType.GAME_CREATED, observer);

// Emitiranje događaja
eventManager.emit(EventType.GAME_CREATED, { gameId: 123 });
// → notify će pozvati observer.update()
```

### Prednosti:
- ✅ Labava povezanost
- ✅ Dinamička registracija
- ✅ Jedan-na-mnogim komunikacija
- ✅ Reaktivno programiranje

### Kada koristiti:
- 🎯 Event handling sustavi
- 🎯 Notifikacijski sustavi
- 🎯 Reaktivne aplikacije
- 🎯 Pub-Sub scenariji
- 🎯 Model-View komunikacija

---

## Kako Koristiti

### 1. Korištenje u komponentama:

```typescript
import React from "react";
import logger from "../services/logger";
import eventManager, { EventType } from "../services/event_manager";

const MyComponent: React.FC = () => {
  const handleUserLogin = () => {
    logger.info("Korisnik se logira");
    
    eventManager.emit(EventType.USER_LOGGED_IN, {
      userId: 123,
      username: "John"
    });
  };
  
  return <button onClick={handleUserLogin}>Prijava</button>;
};
```

### 2. Kreiranja API zahtjeva s adapterima:

```typescript
import { LegacyGameAdapter } from "../services/api_adapter";

// Stari podaci iz legacy sustava
const legacyGame = { game_id: 1, game_name: "CS2", ... };

// Adapter ih čini kompatibilnima
const adapter = new LegacyGameAdapter();
const modernGame = adapter.adaptGame(legacyGame);

// Sada možeš koristiti u aplikaciji
console.log(modernGame.title); // CS2
```

### 3. Demo komponenta:

Koristi `/src/components/DesignPatternsDemo.tsx` za interaktivnu demonstraciju.

---

## 🎯 Kombinacija Svih Paterna

EventManager je **Singleton** što znači:
- Samo jedna instanca u cijeloj aplikaciji
- Globalni pristup za emitiranje i pretplatu na događaje

API Adapter koristi **Adapter** što znači:
- Prijevod između nekompatibilnih sučelja
- Legacy kod postaje kompatibilan s novim
- Format konverzije (CSV ↔ JSON)

Sustav Event-a koristi **Observer** što znači:
- Komponente se registriraju da budu obaviještene
- Labava povezanost između dijelova aplikacije

### Primjer Kombinacije:
```
[UserComponent] --emit--> EventManager
                              ↓
                        (distribuira svim observerima)
                              ↓
    [NotificationComponent] [LoggerObserver] [AnalyticsObserver]
                              ↓
                        logger.info() ← Singleton Logger
```

---

## 📊 Usporedba Paterna

| Pattern | Uloga | Primjer |
|---------|-------|---------|
| **Singleton** | Jedna instanca | Logger, Config, EventManager |
| **Adapter** | Kompatibilnost sučelja | Legacy API, Format konverzija |
| **Observer** | Obavještava o promjenama | Events, Notifications |

---

## ✅ Checklist za Implementaciju

- [x] Singleton Pattern - Logger servis
- [x] Adapter Pattern - API adapter za kompatibilnost
- [x] Observer Pattern - Event Manager sa više observera
- [x] Demo komponenta
- [x] Dokumentacija

---

**Autor:** GameClub Tim  
**Verzija:** 1.0.0  
**Datum:** 2026-01-03
