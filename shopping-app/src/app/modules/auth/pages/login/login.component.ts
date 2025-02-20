import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router){}
  
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']); // Redirect to home after login
      console.log('Login successful!');
    } else {
      console.log('Invalid credentials!');
      this.errorMessage = 'Invalid credentials!';
    }
  }
}
