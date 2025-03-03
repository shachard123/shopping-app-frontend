import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShopService } from 'src/app/core/services/shop.service';
@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent {
  newShopName = '';
  newShopDescription = '';

  constructor(
    public dialogRef: MatDialogRef<ShopDialogComponent>,
    private shopService: ShopService
  ) {}

  /** ✅ Submit Shop Creation */
  addShop() {
    if (!this.newShopName.trim() || !this.newShopDescription.trim()) return;

    this.shopService.createShop({
      name: this.newShopName,
      description: this.newShopDescription,
      phone: "123-456-7890",
      address: "Unknown",
      paymentDetails: "None",
      country: "Unknown"
    }).subscribe(() => {
      this.dialogRef.close(true); // ✅ Close pop-up and refresh list
    });
  }
}
