import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const URL = `${environment.backend}/education-programs`;

@Injectable()
export class ProgramsService {

  constructor(private http: HttpClient) { }

  public find(id: string): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }

  public list(query: any): Observable<any> {
    return this.http.get(`${URL}`, { params: query });
  }
}
