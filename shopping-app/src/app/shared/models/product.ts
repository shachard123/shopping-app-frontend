export interface Product {
    id: string;
    shopId: string; // The shop selling the product
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    colors: string[];
    dimensions: { length: number; width: number; height: number; weight: number };
    material: string;
    imageUrl: string;
  }
  