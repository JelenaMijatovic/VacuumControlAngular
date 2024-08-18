import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = "http://localhost:8080"
  private static httpClient: HttpClient;

  constructor(private httpClient: HttpClient) {

  }
  login(email: String, password: String) {
    /*let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token') });
    let options = { headers: headers };*/
    return this.httpClient.post<any>(`${this.apiUrl}/auth/login`, { email: email, password: password });
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
