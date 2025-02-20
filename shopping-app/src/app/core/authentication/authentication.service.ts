import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signup(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((user: any) => user.username === username)) {
      return false;
    }

    users.push({ username, password});
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((user: any) => user.username === username && user.password === password)) {
      return true;
    }

    return false;
  }
}
