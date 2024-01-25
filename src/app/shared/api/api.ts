import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly urlApiLogin = 'http://51.158.107.27:82/api/login';

  constructor(private http: HttpClient) {
  }

  apiLogin(login: string, password: string): Observable<any> {
    const body = {login, password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<any>(this.urlApiLogin, body, {headers}).pipe(take(1));
  }

}

