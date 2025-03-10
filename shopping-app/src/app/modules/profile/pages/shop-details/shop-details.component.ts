import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService, Shop } from 'src/app/core/services/shop.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  shop: Shop | null = null;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('id');
    if (shopId) {
      this.shopService.getShopById(shopId).subscribe(
        (shop) => (this.shop = shop),
        (error) => console.error('Failed to fetch shop', error)
      );
    }
  }
}
