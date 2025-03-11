import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService, Shop } from 'src/app/core/services/shop.service';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  shop: Shop | null = null;
  shopProducts: Product[] = [];


  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('id');
    if (shopId) {
      this.shopService.getShopById(shopId).subscribe(
        (shop) => (this.shop = shop),
        (error) => console.error('Failed to fetch shop', error)
      );
      this.productService.getProductsByShop(shopId).subscribe(
        (products) => (this.shopProducts = products, console.log('Shop products', products)) ,
        (error) => console.error('Failed to fetch shop products', error)
      );
    }
  }

  loadMyShopProducts() {
    if (this.shop) {
      this.productService.getProductsByShop(this.shop.id).subscribe(
        (products) => (this.shopProducts = products, console.log('Shop products', products)) ,
        (error) => console.error('Failed to fetch shop products', error)
      );
    }
  }
}
