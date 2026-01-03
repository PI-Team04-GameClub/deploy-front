# Design Patterns - Dodjela Paterna po Članovima Tima

## 📋 Struktura Implementacije

Svaki član tima mora implementirati **3 paterna iz različitih kategorija**:
- 1x **Creational** (Kreacijski)
- 1x **Structural** (Strukturni)
- 1x **Behavioral** (Ponašajni)

---

## 👥 Dodjela Paterna po Članovima

### Tim Članova:
```
1. Matija - Branch: feature/patterns-matija
2. [Drugi član] - Branch: feature/patterns-[ime]
3. [Treći član] - Branch: feature/patterns-[ime]
```

---

## ✅ Implementirani Paterna (Matija)

### Branch: `feature/patterns-matija`

#### 1. ✅ **Singleton Pattern** (CREATIONAL)
- 📁 File: `src/services/logger.ts`
- 📝 Opis: Logger servis koji osigurava samo jednu instancu u aplikaciji
- 🎯 Metode:
  - `getInstance()` - Vraća jedinu instancu
  - `info()`, `warn()`, `error()`, `debug()` - Logiranje poruka
  - `getLogs()` - Dohvaća sve logove
  - `exportLogs()` - Izvozni logove kao JSON

#### 2. ✅ **Adapter Pattern** (STRUCTURAL)
- 📁 File: `src/services/api_adapter.ts`
- 📝 Opis: API adapter za kompatibilnost nekompatibilnih sučelja
- 🎯 Adapteri:
  - `LegacyGameAdapter` - Pretvara legacy igre u novi format
  - `OldAPIAdapter` - Čini stariji API kompatibilnim
  - `DataFormatAdapter` - CSV ↔ JSON konverzija

#### 3. ✅ **Observer Pattern** (BEHAVIORAL)
- 📁 File: `src/services/event_manager.ts`
- 📝 Opis: Event management system sa Pub-Sub patterna
- 🎯 Observeri:
  - `NotificationObserver` - Obavijesti
  - `UserActivityObserver` - Praćenje korisnikovih aktivnosti
  - `GameObserver` - Praćenje igre
  - `ErrorObserver` - Praćenje grešaka

---

## 📦 Kako Koristiti Patterne

### Logger (Singleton):
```typescript
import logger from "../services/logger";

logger.info("Poruka");
logger.error("Greška");
logger.warn("Upozorenje");
```

### Adapter (Structural):
```typescript
import { LegacyGameAdapter } from "../services/api_adapter";

const adapter = new LegacyGameAdapter();
const modernGame = adapter.adaptGame(legacyGame);
```

### Event Manager (Observer):
```typescript
import eventManager, { EventType } from "../services/event_manager";

// Registracija
eventManager.subscribe(EventType.USER_LOGGED_IN, observer);

// Emitiranje
eventManager.emit(EventType.USER_LOGGED_IN, { userId: 123 });
```

---

## 🧪 Demo Komponenta

📁 File: `src/components/DesignPatternsDemo.tsx`

Interaktivna demonstracija svih paterna:
- Testiranje Singleton Logger-a
- Testiranje Decorator HTTP zahtjeva
- Testiranje Observer Event sistema

---

## 📋 Git Workflow

### Za druge članove tima:

```bash
# 1. Kreiraj novi branch
git checkout -b feature/patterns-[tvoje-ime]

# 2. Implementiraj patterne u svoj mapi
mkdir src/services/[tvoje-ime]
# - Singleton pattern u: src/services/[tvoje-ime]/
# - Decorator pattern u: src/services/[tvoje-ime]/
# - Observer pattern u: src/services/[tvoje-ime]/

# 3. Commit
git add .
git commit -m "feat: Design patterns - [tvoje-ime]"

# 4. Push
git push origin feature/patterns-[tvoje-ime]
```

---

## 📚 Referentne Datoteke

- 📖 Dokumentacija: `DESIGN_PATTERNS.md`
- 🧪 Demo: `src/components/DesignPatternsDemo.tsx`
- ✅ Singleton: `src/services/logger.ts`
- 🎨 Decorator: `src/services/http_service.ts`
- 📡 Observer: `src/services/event_manager.ts`

---

## 🎯 Zahtjevi za Svaki Pattern

### Singleton ✅
- [x] Privatni konstruktor
- [x] Statička instanca
- [x] getInstance() metoda
- [x] Globalni pristup

### Decorator ✅
- [x] Bazna klasa/sučelje
- [x] Minimalno 2 dekoratora
- [x] Kombiniranje dekoratora
- [x] Čuvanje originalnog ponašanja

### Observer ✅
- [x] Observer sučelje
- [x] Subject klasa (EventManager)
- [x] Minimalno 2 konkretna observera
- [x] Subscribe/emit mehanizam

---

## 📊 Bodovanje

Svaki član koji implementira:
- ✅ 1x Creational pattern = **1 bod**
- ✅ 1x Structural pattern = **1 bod**
- ✅ 1x Behavioral pattern = **1 bod**

**Ukupno: 3 boda po članu**

---

**Kreirano:** 2026-01-03  
**Tima:** GameClub  
**Predmet:** Programsko Inženjerstvo
