import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Permission, User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${email}`)
  }

  getMe(): Observable<User> {
    console.log("Sending...")
    return this.httpClient.get<User>(`${this.apiUrl}/users/me`)
  }

  saveUser(name: string, surname: string, email:string, permissions: Array<Permission>): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, {
      name: name,
      surname: surname,
      email: email,
      password: "temp",
      permissions: permissions
    })
  }

  updateUser(name: string, surname: string, email:string, permissions: Array<string>): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users`, {
      name: name,
      surname: surname,
      email: email,
      password: "temp",
      permissions: permissions
    })
  }

  deleteUser(email: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${email}`)
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/users/${postId}/comments`);
  }

  addComment(postId: number, name: string, email: string, body: string): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/posts/${postId}/comments`, {
      postId: postId,
      name: name,
      email: email,
      body: body
    })
  }
}
