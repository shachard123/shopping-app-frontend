import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `http://localhost:8080/products`;

  constructor(private http: HttpClient) {}

  /** ✅ Helper function to get Authorization Headers */
  private getAuthHeaders() {
    const token = localStorage.getItem('loggedInUser')
      ? JSON.parse(localStorage.getItem('loggedInUser')!).token
      : null;
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  /** ✅ Get all products */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /** ✅ Get a product by ID */
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  /** ✅ Get products by shop */
  getProductsByShop(shopId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shop/${shopId}`);
  }

  /** ✅ Create a new product */
  createProduct(product: Omit<Product, 'id'>): Observable<{ productId: string }> {
    return this.http.post<{ productId: string }>(this.apiUrl, product, this.getAuthHeaders());
  }

  /** ✅ Delete a product */
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, this.getAuthHeaders());
  }

  /** ✅ Update an existing product (if endpoint is available) */
  updateProduct(product: Product): Observable<any> {
    // Assumes there's a PUT endpoint at http://localhost:8080/products/{id}
    return this.http.put(`${this.apiUrl}/${product.id}`, product, this.getAuthHeaders());
  }
}
