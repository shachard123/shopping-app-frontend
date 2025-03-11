import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/users';
  private tokenKey = 'authToken';

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getLoggedInUser()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(username: string, password: string): Observable<{ userId: string }> {
    return this.http
      .post<{ userId: string }>(`${this.apiUrl}/register`, {
        username,
        password,
      })
      .pipe(
        tap(() => {}) // No need to process response
      );
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          sessionStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next({ username, token: response.token });
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isLoggedin(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getLoggedInUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    return { username: 'unknown', token }; // Ideally decode the JWT here
  }
}
