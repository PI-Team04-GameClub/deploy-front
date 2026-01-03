/**
 * SINGLETON PATTERN - CREATIONAL
 * Osigurava samo jednu instancu Logger klase s globalnim pristupom
 * 
 * Kada koristiti:
 * • Samo jedna instanca u aplikaciji
 * • Globalni pristup instanci
 * • Kontrola zajedničkih resursa
 */

class Logger {
  private static instance: Logger;
  private logs: Array<{ timestamp: string; level: string; message: string }> = [];

  // Privatni konstruktor sprječava instanciranje
  private constructor() {
    console.log("Logger instancira se...");
  }

  /**
   * Statička metoda koja vraća jedinu instancu Logger klase
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Logira info poruku
   */
  public info(message: string): void {
    this.log("INFO", message);
  }

  /**
   * Logira warning poruku
   */
  public warn(message: string): void {
    this.log("WARN", message);
  }

  /**
   * Logira error poruku
   */
  public error(message: string): void {
    this.log("ERROR", message);
  }

  /**
   * Logira debug poruku
   */
  public debug(message: string): void {
    this.log("DEBUG", message);
  }

  /**
   * Internu logiranja
   */
  private log(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };

    this.logs.push(logEntry);

    // Ispis u konzolu
    const style = this.getStyleForLevel(level);
    console.log(
      `%c[${timestamp}] ${level}: ${message}`,
      style
    );
  }

  /**
   * Vraća sve logove
   */
  public getLogs(): Array<{ timestamp: string; level: string; message: string }> {
    return [...this.logs];
  }

  /**
   * Čisti sve logove
   */
  public clearLogs(): void {
    this.logs = [];
    this.info("Logovi su obrisani");
  }

  /**
   * Izvozi logove kao JSON
   */
  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Dohvaća CSS stil za nivo logiranja
   */
  private getStyleForLevel(level: string): string {
    const styles: Record<string, string> = {
      INFO: "color: blue; font-weight: bold;",
      WARN: "color: orange; font-weight: bold;",
      ERROR: "color: red; font-weight: bold;",
      DEBUG: "color: gray;",
    };
    return styles[level] || "color: black;";
  }
}

// Izvoz jedine instance
export default Logger.getInstance();
