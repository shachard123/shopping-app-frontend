import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router){}


  login() {
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

  signup() {
    if(this.password !== this.confirmPassword) {
      console.log('Passwords do not match!');
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.signup(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']); // Redirect to login after signup
        console.log('Signup successful!');
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Username already exists!';
          console.log('Username already exists!');
        } else {
          this.errorMessage = 'Error signing up';
          console.error('Error signing up', error);
        }
      },
    });

    // if (this.password !== this.confirmPassword) {
    //   console.log('Passwords do not match!');
    //   this.errorMessage = 'Passwords do not match!';
    //   return;
    // }

    // if (this.authService.signup(this.username, this.password)) {
    //   this.router.navigate(['/auth/login']); // Redirect to login after signup
    // } else {
    //   console.log('Username already exists!');
    //   this.errorMessage = 'Username already exists!';
    // }
  }
}
