import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  productName = '';
  productDescription = '';
  category = '';
  price: number | null = null;
  stock: number | null = null;
  newProductImageBase64: string | undefined = undefined;
  selectedFileName = '';

  // You might want to pass the shopId via dialog data if needed.
  // For this example, we'll assume a dummy shopId.
  shopId:string;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private productService: ProductService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shopId = data.shopId;
  }

  async handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.newProductImageBase64 = await this.utilsService.toBase64(file);
    }
  }

  addProduct() {
    // Basic validation for required fields
    if (
      !this.productName.trim() ||
      !this.productDescription.trim() ||
      !this.category.trim()
    ) {
      return;
    }

    const product = {
      shopId: this.shopId,
      name: this.productName,
      description: this.productDescription,
      category: this.category,
      price: this.price || 0,
      stock: this.stock || 0,
      imageBase64: this.newProductImageBase64 || ''
    };

    this.productService.createProduct(product).subscribe(() => {
      this.dialogRef.close(true); // Close dialog and optionally refresh list
    });
  }
}
