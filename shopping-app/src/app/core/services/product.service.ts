import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 99.99,
      imageUrl: "https://1pc.co.il/images/thumbs/0149572_-edifier-stax-spirit-s5_510.jpeg",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest model with high-resolution display and powerful processor.",
      price: 699.99,
      imageUrl: "https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg?semt=ais_hybrid",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Gaming Laptop",
      description: "Powerful gaming laptop with high refresh rate display.",
      price: 1299.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOlSERWJA4Lkn--Ttm7NoD-Uoi_qgmyiZwYA&s",
      category: "Computers"
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Comfortable and stylish running shoes.",
      price: 49.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09528.jpg",
      category: "Clothing"
    },
    {
      id: 5,
      name: "Digital Camera",
      description: "Capture stunning photos with this 20MP camera.",
      price: 499.99,
      imageUrl: "https://i1.adis.ws/i/canon/powershot-g7-x-mark-iii-frt_800x800_51bd55c6-758d-11e9-8f40-f8b156c1dc4d_51bd55c0-758d-11e9-a137-f8b156c1dc4d?w=800&h=800",
      category: "Cameras"
    }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }
}
