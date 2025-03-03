import { Component, OnInit } from '@angular/core';
import { ShopService, Shop } from 'src/app/core/services/shop.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username!: string;
  shops: Shop[] = [];
  newShopName = '';
  newShopDescription = '';
  errorMessage = '';
  successMessage = '';

  constructor(private shopService: ShopService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.username = this.authService.getLoggedInUser()?.username || 'User';
    this.loadMyShops();
  }

  /** ✅ Fetch all shops the user owns */
  loadMyShops() {
    this.shopService.getMyShops().subscribe(
      (shops) => (this.shops = shops),
      () => (this.errorMessage = 'Failed to load shops')
    );
  }

  /** ✅ Create a new shop */
  addShop() {
    if (!this.newShopName.trim() || !this.newShopDescription.trim()) {
      this.errorMessage = 'Shop name and description are required';
      return;
    }

    this.shopService.createShop({ 
      name: this.newShopName, 
      description: this.newShopDescription, 
      phone: "123-456-7890", 
      address: "Unknown", 
      paymentDetails: "None", 
      country: "Unknown"
    }).subscribe(
      (response) => {
        this.successMessage = 'Shop created successfully!';
        this.newShopName = '';
        this.newShopDescription = '';
        this.loadMyShops(); // Refresh shop list
      },
      () => {
        this.errorMessage = 'Failed to create shop';
      }
    );
  }

  /** ✅ Delete a shop */
  deleteShop(shopId: string) {
    this.shopService.deleteShop(shopId).subscribe(
      () => {
        this.successMessage = 'Shop deleted successfully!';
        this.loadMyShops(); // Refresh shop list
      },
      () => {
        this.errorMessage = 'Failed to delete shop';
      }
    );
  }
}
