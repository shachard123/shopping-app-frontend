import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private searchSubscription!: Subscription;

  constructor(private productService: ProductService, 
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;

    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        this.filterProducts(query);
      }
    );
  }

  filterProducts(query: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe(); // ✅ Prevent memory leaks
  }
}
