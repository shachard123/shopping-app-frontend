import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';

export interface User {
  username: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/users'; // ✅ Change to your backend URL
  private loggedInUserKey = 'loggedInUser'; // Stores JWT token

  private currentUserSubject = new BehaviorSubject<User | null>(
    localStorage.getItem(this.loggedInUserKey)
      ? JSON.parse(localStorage.getItem(this.loggedInUserKey)!)
      : null
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}


  signup(username: string, password: string): Observable<void> {
    return this.http.post<{ userId: string }>(`${this.apiUrl}/register`, { username, password }).pipe(
      map(response => {})
    );
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        localStorage.setItem(this.loggedInUserKey, JSON.stringify({ username, token: response.token }));
        this.currentUserSubject.next({ username, token: response.token });
      })
    );
  }
  

  /** ✅ Logout */
  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.currentUserSubject.next(null);
  }

  /** ✅ Check if User is Logged In */
  isLoggedin(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  /** ✅ Get Logged-in User */
  getLoggedInUser(): User | null {
    return localStorage.getItem(this.loggedInUserKey)
      ? JSON.parse(localStorage.getItem(this.loggedInUserKey)!)
      : null;
  }
}
