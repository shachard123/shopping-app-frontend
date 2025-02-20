import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false;
  username: string | null = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.authService.getLoggedInUser();
      this.username = user ? user.username : '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
    this.checkAuthStatus(); // Refresh navbar state
  }
}
