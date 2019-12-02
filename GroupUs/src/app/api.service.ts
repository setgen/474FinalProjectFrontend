import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User'
import { Group } from './models/Group';

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

  getToken():string {
    return localStorage.getItem('token');
  }

  getCurrUser():User {
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

  updateUser(u:User) {
    return this.http.put(
      this.baseURL + '/users/user_id',
      {
        "username":u.username,
        //"password":u.password,
        "firstName":u.firstName,
        "lastName":u.lastName,
        "bio":u.bio,
        "groupIDs":u.groupIDs,
        "profilePicture":u.picture
      },
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':this.getToken(),
          'Access-Control-Allow-Origin':'*'
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

  createGroup(g:Group): Observable<any> {
    return this.http.post(
      this.baseURL + '/groups',
      {
        "groupName":g.groupName,
        "members":g.members,
        "messages":g.messages,
        "events":g.events
      },
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':this.getToken(),
          'Access-Control-Allow-Origin':'*'
        })
      }
    )
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
      {
        "firstName":fname, 
        "lastName":lname, 
        "username":u, 
        "password":p,
        "groupIDs":[]
      },
      {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
    )
  }
}
