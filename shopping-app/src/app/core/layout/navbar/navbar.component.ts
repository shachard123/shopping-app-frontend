import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from 'src/app/core/authentication/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentUser$: Observable<User | null> = this.authService.currentUser$;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
  }

}
