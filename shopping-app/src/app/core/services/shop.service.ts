import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shop {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  paymentDetails: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = `http://localhost:8080/shops`;

  constructor(private http: HttpClient) {}

  /** ✅ Get all shops */
  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl);
  }

  /** ✅ Get a shop by ID */
  getShopById(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${shopId}`);
  }

  /** ✅ Get shops owned by the logged-in user */
  getMyShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.apiUrl}/my`, this.getAuthHeaders());
  }

  /** ✅ Create a new shop */
  createShop(shop: Omit<Shop, 'id'>): Observable<{ shopId: string }> {
    return this.http.post<{ shopId: string }>(this.apiUrl, shop, this.getAuthHeaders());
  }

  /** ✅ Delete a shop */
  deleteShop(shopId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${shopId}`, this.getAuthHeaders());
  }

  /** ✅ Helper function to get Authorization Headers */
  private getAuthHeaders() {
    const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!).token : null;
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }
}
