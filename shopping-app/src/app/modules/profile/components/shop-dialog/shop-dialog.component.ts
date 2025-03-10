import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShopService } from 'src/app/core/services/shop.service';
import { UtilsService } from 'src/app/core/services/utils.service';
@Component({
  selector: 'app-shop-dialog',
  templateUrl: './shop-dialog.component.html',
  styleUrls: ['./shop-dialog.component.scss']
})
export class ShopDialogComponent {
  newShopName = '';
  newShopDescription = '';
  newShopLogoBase64: string | undefined = undefined; 

  constructor(
    public dialogRef: MatDialogRef<ShopDialogComponent>,
    private shopService: ShopService,
    private utilsService: UtilsService
  ) {}

  async handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newShopLogoBase64 = await this.utilsService.toBase64(file);
    }
  }

  /** ✅ Submit Shop Creation */
  addShop() {
    if (!this.newShopName.trim() || !this.newShopDescription.trim()) return;

    this.shopService.createShop({
      name: this.newShopName,
      description: this.newShopDescription,
      phone: "123-456-7890",
      address: "Unknown",
      paymentDetails: "None",
      country: "Unknown",
      ...this.newShopLogoBase64 ? { logoBase64: this.newShopLogoBase64 } : {}
    }).subscribe(() => {
      this.dialogRef.close(true); // ✅ Close pop-up and refresh list
    });
  }
}
