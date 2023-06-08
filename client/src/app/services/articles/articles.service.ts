import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevCommunityModel } from 'src/app/models/dev-community.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<HttpResponse<DevCommunityModel[]>> {
    return this.httpClient.get<DevCommunityModel[]>('https://dev.to/api/articles?username=abraaom', {
      observe: 'response',
      responseType: 'json',
    });
  }
}
