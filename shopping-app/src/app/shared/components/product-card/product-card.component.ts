import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isShopView: boolean = false; 


  @Output() deleteProduct = new EventEmitter<string>();

  onDelete() {
    this.deleteProduct.emit(this.product.id);
  }
}
