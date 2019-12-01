import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "http://localhost:5000/api";
  }

  setToken(t:string) {
    localStorage.setItem('token',t);
  }

  setCurrUser(u:User) {
    localStorage.setItem('currUser',JSON.stringify(u));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCurrUser() {
    return JSON.parse(localStorage.getItem('currUser'));
  }

  getUsers(): Observable<any> {
    return this.http.get(
      this.baseURL + '/users',
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    );
  }

  getGroups(): Observable<any> {
    return this.http.get(
      this.baseURL + '/groups',
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    );
  }

  login(u:string, p:string): Observable<any> {
    return this.http.post(
      this.baseURL + '/users/user_id',
      {"username":u, "password":p},
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    )
  }

  register(fname:string, lname:string, u:string, p:string): Observable<any> {
    return this.http.post(
      this.baseURL + '/users',
      {"firstName":fname, "lastName":lname, "username":u, "password":p},
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    )
  }
}
