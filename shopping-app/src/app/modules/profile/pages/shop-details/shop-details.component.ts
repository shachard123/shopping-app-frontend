import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService, Shop } from 'src/app/core/services/shop.service';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  shop: Shop | null = null;
  shopProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('id');
    if (shopId) {
      this.shopService.getShopById(shopId).subscribe(
        (shop) => (this.shop = shop),
        (error) => console.error('Failed to fetch shop', error)
      );
      this.productService.getProductsByShop(shopId).subscribe(
        (products) => (
          (this.shopProducts = products), console.log('Shop products', products)
        ),
        (error) => console.error('Failed to fetch shop products', error)
      );
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent,
      { data: { shopId: this.shop?.id } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadMyShopProducts(); // Refresh after creating a shop
    });
  }

  loadMyShopProducts() {
    if (this.shop) {
      this.productService.getProductsByShop(this.shop.id).subscribe(
        (products) => (
          (this.shopProducts = products), console.log('Shop products', products)
        ),
        (error) => console.error('Failed to fetch shop products', error)
      );
    }
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadMyShopProducts(); // Refresh after deleting a product
    });
  }
}
