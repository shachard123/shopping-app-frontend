import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    //check if the username and password are not empty
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill out the form!';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // Redirect to home after login
        console.log('Login successful!');
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials!';
          console.log('Invalid credentials!');
        } else {
          this.errorMessage = 'Error logging in';
          console.error('Error logging in', error);
        }
      },
    });
  }
}
