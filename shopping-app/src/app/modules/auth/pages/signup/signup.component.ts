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

  signup() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match!');
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.authService.signup(this.username, this.password)) {
      this.router.navigate(['/auth/login']); // Redirect to login after signup
    } else {
      console.log('Username already exists!');
      this.errorMessage = 'Username already exists!';
    }
  }
}
