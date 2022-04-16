import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const URL = `${environment.backend}/touristic-areas`;

@Injectable()
export class TouristicAreasService {

  constructor(private http: HttpClient) { }

  public find(id: string): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }

  public list(query: any): Observable<any> {
    return this.http.get(`${URL}`, { params: query });
  }
}
