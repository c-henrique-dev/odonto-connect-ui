import { HttpClient, HttpParams } from "@angular/common/http"
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

export class HttpBaseService {
    private readonly httpClient!: HttpClient;

  private apiBase = environment.API_URL;

  constructor(protected readonly injector: Injector) {
    if (injector == null || injector == undefined) {
      throw new Error('Injector não pode ser nulo');
    }
    this.httpClient = injector.get(HttpClient);
  }

  protected httpGet(endpoint: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(`${this.apiBase}${endpoint}`, { params });
  }

  protected httpGetDownload(endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.apiBase}${endpoint}`, { responseType: 'blob' });
  }

  protected httpPost(endpoint: string, dados?: any): Observable<any> {
    return this.httpClient.post(`${this.apiBase}${endpoint}`, dados);
  }

  protected httpPatch(endpoint: string, dados: any): Observable<any> {
    return this.httpClient.patch(`${this.apiBase}${endpoint}`, dados);
  }

  protected httpDelete(endpoint: string): Observable<any> {
    return this.httpClient.delete(`${this.apiBase}${endpoint}`);
  }
}