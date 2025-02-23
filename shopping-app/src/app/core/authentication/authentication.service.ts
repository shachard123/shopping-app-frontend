import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private usersKey = 'users';
  private loggedInUserKey = 'loggedInUser';

  // Initialize from localStorage:
  private currentUserSubject = new BehaviorSubject<User | null>(
    localStorage.getItem(this.loggedInUserKey)
      ? JSON.parse(localStorage.getItem(this.loggedInUserKey)!)
      : null
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  signup(username: string, password: string): boolean {
    let users = this.getUsers();

    if (users.find((user: any) => user.username === username)) {
      return false;
    }

    users.push({ username, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    let users = this.getUsers();
    let user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.currentUserSubject.next(null);
  }

  isLoggedin(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  getLoggedInUser(): User | null {
    return localStorage.getItem(this.loggedInUserKey)
      ? JSON.parse(localStorage.getItem(this.loggedInUserKey)!)
      : null;
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
