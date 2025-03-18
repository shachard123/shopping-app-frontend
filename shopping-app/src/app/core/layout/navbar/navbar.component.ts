import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from 'src/app/core/authentication/authentication.service';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentUser$: Observable<User | null> = this.authService.currentUser$;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private searchService: SearchService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchService.updateSearch(query); // Send search term to the service
  }
}
