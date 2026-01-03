/**
 * DECORATOR PATTERN - STRUCTURAL
 * Dinamički dodaje nove funkcionalnosti objektu bez mijenjanja originalnog
 * 
 * Kada koristiti:
 * • Dinamičko dodavanje funkcionalnosti
 * • Alternativa nasljeđivanju
 * • Kombiniranje ponašanja
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import logger from "./logger";

/**
 * Bazni HTTP servis
 */
interface HttpService {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

/**
 * Osnovna implementacija HTTP servisa
 */
class BasicHttpService implements HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

/**
 * DECORATOR 1: Logiranje zahtjeva i odgovora
 */
class LoggingDecorator implements HttpService {
  constructor(private httpService: HttpService) {}

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    logger.info(`GET zahtjev: ${url}`);
    try {
      const result = await this.httpService.get<T>(url, config);
      logger.info(`GET zahtjev uspješan: ${url}`);
      return result;
    } catch (error) {
      logger.error(`GET zahtjev neuspješan: ${url} - ${error}`);
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    logger.info(`POST zahtjev: ${url}`);
    try {
      const result = await this.httpService.post<T>(url, data, config);
      logger.info(`POST zahtjev uspješan: ${url}`);
      return result;
    } catch (error) {
      logger.error(`POST zahtjev neuspješan: ${url} - ${error}`);
      throw error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    logger.info(`PUT zahtjev: ${url}`);
    try {
      const result = await this.httpService.put<T>(url, data, config);
      logger.info(`PUT zahtjev uspješan: ${url}`);
      return result;
    } catch (error) {
      logger.error(`PUT zahtjev neuspješan: ${url} - ${error}`);
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    logger.info(`DELETE zahtjev: ${url}`);
    try {
      const result = await this.httpService.delete<T>(url, config);
      logger.info(`DELETE zahtjev uspješan: ${url}`);
      return result;
    } catch (error) {
      logger.error(`DELETE zahtjev neuspješan: ${url} - ${error}`);
      throw error;
    }
  }
}

/**
 * DECORATOR 2: Mjerenje vremena izvršavanja
 */
class TimingDecorator implements HttpService {
  constructor(private httpService: HttpService) {}

  private measureTime<T>(methodName: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    return fn().then((result) => {
      const end = performance.now();
      logger.debug(`${methodName} vrijeme izvršavanja: ${(end - start).toFixed(2)}ms`);
      return result;
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.measureTime("GET", () => this.httpService.get<T>(url, config));
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.measureTime("POST", () => this.httpService.post<T>(url, data, config));
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.measureTime("PUT", () => this.httpService.put<T>(url, data, config));
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.measureTime("DELETE", () => this.httpService.delete<T>(url, config));
  }
}

/**
 * DECORATOR 3: Retry mehanizam
 */
class RetryDecorator implements HttpService {
  constructor(private httpService: HttpService, private maxRetries: number = 3) {}

  private async retryOperation<T>(
    operation: () => Promise<T>,
    methodName: string
  ): Promise<T> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === this.maxRetries) {
          logger.error(`${methodName} neuspješno nakon ${this.maxRetries} pokušaja`);
          throw error;
        }
        logger.warn(`${methodName} pokušaj ${attempt} neuspješan, pokušavam ponovno...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw new Error("Retry operacija neuspješna");
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.retryOperation(() => this.httpService.get<T>(url, config), "GET");
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.retryOperation(() => this.httpService.post<T>(url, data, config), "POST");
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.retryOperation(() => this.httpService.put<T>(url, data, config), "PUT");
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.retryOperation(() => this.httpService.delete<T>(url, config), "DELETE");
  }
}

/**
 * Exporta HTTP servis sa svim decoratorima
 */
export function createHttpService(baseURL: string): HttpService {
  const basicService = new BasicHttpService(baseURL);
  const withLogging = new LoggingDecorator(basicService);
  const withTiming = new TimingDecorator(withLogging);
  const withRetry = new RetryDecorator(withTiming);

  return withRetry;
}

export { BasicHttpService, LoggingDecorator, TimingDecorator, RetryDecorator };
