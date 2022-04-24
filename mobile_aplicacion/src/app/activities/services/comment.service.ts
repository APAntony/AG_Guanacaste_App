import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const URL = `${environment.backend}/activities`;

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  public list(id: string, query: any): Observable<any> {
    return this.http.get(`${URL}/${id}/comments`, { params: query })
  }

  public create(id: number, body: any): Observable<any> {
    return this.http.post(`${URL}/${id}/comments`, body)
  }
}
