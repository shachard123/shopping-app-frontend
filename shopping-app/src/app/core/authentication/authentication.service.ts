import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = 'http://localhost:8080/users';
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(username: string, password: string): Observable<{ userId: string }> {
    return this.http.post<{ userId: string }>(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((user) => this.storeUser(user))
    );
  }

  logout(): void {
    this.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return this.currentUserSubject.value?.username || null;
  }

  private loadUserFromStorage(): User | null {
    const token = this.getToken();
    const userData = sessionStorage.getItem(this.userKey);

    if (!token || !userData) return null;

    try {
      return { ...JSON.parse(userData), token } as User;
    } catch {
      return null;
    }
  }

  private storeUser(user: User): void {
    sessionStorage.setItem(this.tokenKey, user.token);
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearUser(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
}
