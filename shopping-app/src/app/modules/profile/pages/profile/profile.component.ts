import { Component, OnInit } from '@angular/core';
import { ShopService, Shop } from 'src/app/core/services/shop.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ShopDialogComponent } from '../../components/shop-dialog/shop-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username!: string;
  shops: Shop[] = [];

  constructor(
    private shopService: ShopService, 
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getLoggedInUser()?.username || 'User';
    this.loadMyShops();
  }

  /** ✅ Fetch all shops the user owns */
  loadMyShops() {
    this.shopService.getMyShops().subscribe(
      (shops) => (this.shops = shops),
      () => console.error("Failed to load shops")
    );
  }

  /** ✅ Open Shop Creation Pop-up */
  openShopDialog() {
    const dialogRef = this.dialog.open(ShopDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadMyShops(); // Refresh after creating a shop
    });
  }

  deleteShop(shopId: string) {
    this.shopService.deleteShop(shopId).subscribe({
      next: () =>{
        this.loadMyShops(); // ✅ Refresh shop list after deletion
      },
      error: (e) => console.error("Failed to delete shop with error ", e)
    });
  }

  goToShop(shopId: string) {
    this.router.navigate(['/profile/shop', shopId]);
  }
  
}
