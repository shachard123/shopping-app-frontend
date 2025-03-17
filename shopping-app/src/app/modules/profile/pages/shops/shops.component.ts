import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Shop, ShopService } from 'src/app/core/services/shop.service';
import { ShopDialogComponent } from '../../components/shop-dialog/shop-dialog.component';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent {
  username!: string;
  shops: Shop[] = [];

  constructor(
    private shopService: ShopService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'User';
    this.loadMyShops();
  }

  loadMyShops() {
    this.shopService.getMyShops().subscribe({
      next: (shops) => {
        this.shops = shops;
      },
      error: (e) => console.error('Failed to load shops with error', e),
    });
  }

  /* Shop creation dialog */
  openShopDialog() {
    const dialogRef = this.dialog.open(ShopDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadMyShops(); // Refresh shop list
    });
  }

  deleteShop(shopId: string) {
    this.shopService.deleteShop(shopId).subscribe({
      next: () => {
        this.loadMyShops(); // Refresh shop list
      },
      error: (e) => console.error('Failed to delete shop with error ', e),
    });
  }

  //when clicked on shop
  goToShop(shopId: string) {
    this.router.navigate(['/profile/shops', shopId]);
  }
}
