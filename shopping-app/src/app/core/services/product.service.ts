import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      shopId: 'shop1', // Example shop ID
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 99.99,
      imageUrl: "https://1pc.co.il/images/thumbs/0149572_-edifier-stax-spirit-s5_510.jpeg",
      category: "Electronics",
      stock: 10,
      colors: ["Black", "White"],
      material: "Plastic & Metal",
      dimensions: { length: 15, width: 10, height: 5, weight: 0.5 }
    },
    {
      id: '2',
      shopId: 'shop2',
      name: "Smartphone",
      description: "Latest model with high-resolution display and powerful processor.",
      price: 699.99,
      imageUrl: "https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg?semt=ais_hybrid",
      category: "Electronics",
      stock: 20,
      colors: ["Black", "Silver"],
      material: "Glass & Aluminum",
      dimensions: { length: 14, width: 7, height: 1, weight: 0.2 }
    },
    {
      id: '3',
      shopId: 'shop3',
      name: "Gaming Laptop",
      description: "Powerful gaming laptop with high refresh rate display.",
      price: 1299.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOlSERWJA4Lkn--Ttm7NoD-Uoi_qgmyiZwYA&s",
      category: "Computers",
      stock: 5,
      colors: ["Black"],
      material: "Aluminum & Plastic",
      dimensions: { length: 35, width: 24, height: 2, weight: 2.5 }
    },
    {
      id: '4',
      shopId: 'shop1',
      name: "Running Shoes",
      description: "Comfortable and stylish running shoes.",
      price: 49.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09528.jpg",
      category: "Clothing",
      stock: 30,
      colors: ["Red", "Blue", "Black"],
      material: "Synthetic & Rubber",
      dimensions: { length: 28, width: 10, height: 12, weight: 0.8 }
    },
    {
      id: '5',
      shopId: 'shop2',
      name: "Digital Camera",
      description: "Capture stunning photos with this 20MP camera.",
      price: 499.99,
      imageUrl: "https://i1.adis.ws/i/canon/powershot-g7-x-mark-iii-frt_800x800_51bd55c6-758d-11e9-8f40-f8b156c1dc4d_51bd55c0-758d-11e9-a137-f8b156c1dc4d?w=800&h=800",
      category: "Cameras",
      stock: 8,
      colors: ["Black"],
      material: "Plastic & Metal",
      dimensions: { length: 12, width: 6, height: 8, weight: 0.6 }
    }
  ];

  private productSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productSubject.asObservable();

  constructor() {}

  // ✅ Get all products
  getProducts(): Product[] {
    return this.products;
  }

  // ✅ Get products by shop
  getProductsByShop(shopId: string): Product[] {
    return this.products.filter(product => product.shopId === shopId);
  }

  // ✅ Get a single product by ID
  getProductById(productId: string): Product | undefined {
    return this.products.find(product => product.id === productId);
  }

  // ✅ Add a new product
  addProduct(product: Product) {
    this.products.push(product);
    this.productSubject.next(this.products);
  }

  // ✅ Update an existing product
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productSubject.next(this.products);
    }
  }

  // ✅ Delete a product
  deleteProduct(productId: string) {
    this.products = this.products.filter(product => product.id !== productId);
    this.productSubject.next(this.products);
  }
}
