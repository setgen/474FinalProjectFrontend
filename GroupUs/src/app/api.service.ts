import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "http://localhost:5000/api";
  }

  getUsers(): Observable<any> {
    return this.http.get(
      this.baseURL + '/users',
      httpOptions
    );
  }

  getGroups(): Observable<any> {
    return this.http.get(
      this.baseURL + '/groups',
      httpOptions
    );
  }
}
