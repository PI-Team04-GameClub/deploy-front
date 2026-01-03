# Design Patterns - GameClub Frontend

Ovo je dokumentacija implementacije tri design paterna za GameClub frontend aplikaciju.

## 📋 Sadržaj

1. [Singleton Pattern (Creational)](#singleton-pattern)
2. [Decorator Pattern (Structural)](#decorator-pattern)
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

## Decorator Pattern

### 📁 Datoteka: `src/services/http_service.ts`

**Što je Decorator?**
- Dinamički **dodaje nove funkcionalnosti** objektu u runtime-u
- Ne mijenja originalni objekt
- Alternativa nasljeđivanju

### Primjena u kodu:

Bazna klasa:
```typescript
class BasicHttpService implements HttpService {
  async get<T>(url: string): Promise<T> {
    return axios.get(url).then(res => res.data);
  }
}
```

**Decorator 1 - LoggingDecorator:**
```typescript
class LoggingDecorator implements HttpService {
  constructor(private httpService: HttpService) {}
  
  async get<T>(url: string): Promise<T> {
    logger.info(`GET: ${url}`);
    const result = await this.httpService.get<T>(url);
    logger.info(`GET završen: ${url}`);
    return result;
  }
}
```

**Decorator 2 - TimingDecorator:**
```typescript
class TimingDecorator implements HttpService {
  // Mjeri vrijeme izvršavanja
  async get<T>(url: string): Promise<T> {
    const start = performance.now();
    const result = await this.httpService.get<T>(url);
    const duration = performance.now() - start;
    logger.debug(`Vrijeme: ${duration}ms`);
    return result;
  }
}
```

**Decorator 3 - RetryDecorator:**
```typescript
class RetryDecorator implements HttpService {
  // Pokušava ponovno ako zahtjev ne uspije
  async get<T>(url: string): Promise<T> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await this.httpService.get<T>(url);
      } catch (error) {
        if (attempt === 3) throw error;
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }
}
```

### Stacking Decoratora:
```typescript
const httpService = createHttpService("https://api.example.com");
// Result: BasicHttpService → LoggingDecorator → TimingDecorator → RetryDecorator
```

### Prednosti:
- ✅ Fleksibilna funkcionalnost
- ✅ Dinamička kombinacija ponašanja
- ✅ Čist kod bez dugačkog naslijeđa
- ✅ Single Responsibility Principle

### Kada koristiti:
- 🎯 Logiranje HTTP zahtjeva
- 🎯 Mjerenje performansi
- 🎯 Retry mehanizmi
- 🎯 Caching
- 🎯 Validacija

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

### 2. Kreiranja API zahtjeva s decoratorima:

```typescript
import { createHttpService } from "../services/http_service";

const api = createHttpService("https://api.gameclub.com");

// Automatski će biti: logano, mjereno vrijeme, i retry
const users = await api.get<User[]>("/users");
const game = await api.post<Game>("/games", gameData);
```

### 3. Demo komponenta:

Koristi `/src/components/DesignPatternsDemo.tsx` za interaktivnu demonstraciju.

---

## 🎯 Kombinacija Svih Paterna

EventManager je **Singleton** što znači:
- Samo jedna instanca u cijeloj aplikaciji
- Globalni pristup za emitiranje i pretplatu na događaje

HTTP Servis koristi **Decorator** što znači:
- Logiranje zahtjeva (LoggingDecorator)
- Mjerenje vremena (TimingDecorator)
- Retry mehanizam (RetryDecorator)

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
| **Decorator** | Dodaje funkcionalnost | HTTP Logging, Retry, Caching |
| **Observer** | Obavještava o promjenama | Events, Notifications |

---

## ✅ Checklist za Implementaciju

- [x] Singleton Pattern - Logger servis
- [x] Decorator Pattern - HTTP servis sa 3 decoratora
- [x] Observer Pattern - Event Manager sa više observera
- [x] Demo komponenta
- [x] Dokumentacija

---

**Autor:** GameClub Tim  
**Verzija:** 1.0.0  
**Datum:** 2026-01-03
