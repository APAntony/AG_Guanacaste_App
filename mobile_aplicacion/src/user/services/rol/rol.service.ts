import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const URL = `${environment.backend}/roles`;

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${URL}`);
  }

  public find(id: number): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }
}
