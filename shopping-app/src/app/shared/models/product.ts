export interface Product {
    id: string;
    shopId: string; // The shop selling the product
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageBase64: string;
  }
  