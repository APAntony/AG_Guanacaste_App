import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const URL = `${environment.backend}/education-programs`;

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  public list(id: string, query:any): Observable<any> {
    return this.http.get(`${URL}/${id}/comments`, { params: query })
  }

  public create(id: string, body: any): Observable<any> {
    return this.http.post(`${URL}/${id}/comments`, body)
  }
}
