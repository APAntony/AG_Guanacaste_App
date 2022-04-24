import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const URL = `${environment.backend}/users`;

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  public create(body: any): Observable<any> {
    return this.http.post(`${URL}`, body);
  }

  public update(id: number, body: any): Observable<any> {
    return this.http.put(`${URL}/${id}`, body);
  }

  public find(id:number): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }
}
