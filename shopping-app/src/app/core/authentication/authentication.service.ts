import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = 'http://localhost:8080/users';
  private readonly tokenKey = 'authToken';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser(); // ✅ Auto-fetch user after refresh
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loadUser(); 
      })
    );
  }

  getUser(): Observable<User> {  
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return [];
      })
    );
  }
  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private loadUser(): void {
    if (this.isLoggedIn()) {
      this.getUser().subscribe();
    }
  }
  
}
