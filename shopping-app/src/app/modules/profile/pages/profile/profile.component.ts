import { Component} from '@angular/core';
import { AuthenticationService, User } from 'src/app/core/authentication/authentication.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  currentUser$: Observable<User | null> = this.authService.currentUser$;

  constructor(
    private authService: AuthenticationService
  ) { }

}
