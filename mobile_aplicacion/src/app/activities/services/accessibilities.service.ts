import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const URL = `${environment.backend}/accessibilities`;

@Injectable()
export class AccessibilitiesService {

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${URL}`);
  }
}
