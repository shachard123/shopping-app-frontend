import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/core/services/shop.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username!: string;
  shops: Shop[] = [];

  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Unknown User';
  }
}
