import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = `${environment.backend}/auth`

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(body: string): Observable<any> {
    return this.http.post(`${URL}/login`, body);
  }
}
