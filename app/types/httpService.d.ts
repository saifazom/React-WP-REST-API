declare module "httpService" {
  export interface HttpServiceOptions {
    baseURL?: string;
    headers?: Record<string, string>;
    timeout?: number;
  }
  export interface HttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  }
  export interface HttpService {
    get<T = any>(
      url: string,
      options?: HttpServiceOptions
    ): Promise<HttpResponse<T>>;
    post<T = any>(
      url: string,
      data?: any,
      options?: HttpServiceOptions
    ): Promise<HttpResponse<T>>;
    put<T = any>(
      url: string,
      data?: any,
      options?: HttpServiceOptions
    ): Promise<HttpResponse<T>>;
    delete<T = any>(
      url: string,
      options?: HttpServiceOptions
    ): Promise<HttpResponse<T>>;
  }
}
export {};
