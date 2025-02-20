import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersKey = 'users';
  private loggedInUserKey = 'loggedInUser';

  constructor() { }

  signup(username: string, password: string): boolean {
    let users = this.getUsers();

    if (users.find((user: any) => user.username === username)) {
      return false;
    }

    users.push({ username, password});
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    let users = this.getUsers();
    let user = users.find((user: any) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInUserKey);
  }

  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem(this.loggedInUserKey) || '{}');
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
