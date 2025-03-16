import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product; // Product data will be passed from the parent component
  @Input() isShopView: boolean = false; // Determines if shown in the shop management page


  @Output() deleteProduct = new EventEmitter<string>(); // ✅ Emit delete event

  onDelete() {
    this.deleteProduct.emit(this.product.id); // ✅ Emit product ID when "Delete" is clicked
  }
}
