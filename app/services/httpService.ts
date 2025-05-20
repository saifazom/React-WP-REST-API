import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import type { AxiosError as ApiErrorResponse } from "axios";
import { createErrorResponse, handleAxiosError } from "~/utils/errorHandler";

class HttpService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        const errorResponse = createErrorResponse(error);
        return Promise.reject(errorResponse);
      }
    );
  }

  // Enhanced error handling for HTTP methods
  public async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    try {
      const response = await this.api.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ) {
    try {
      const response = await this.api.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ) {
    try {
      const response = await this.api.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig<any>) {
    try {
      const response = await this.api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
}

export const httpService = new HttpService();
