import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shop {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  paymentDetails: string;
  country: string;
  logoBase64?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = `http://localhost:8080/shops`;

  constructor(private http: HttpClient) {}

  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl);
  }

  getShopById(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${shopId}`);
  }

  getMyShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.apiUrl}/my`);
  }

  createShop(shop: Omit<Shop, 'id'>): Observable<{ shopId: string }> {
    console.log(shop);
    return this.http.post<{ shopId: string }>(this.apiUrl, shop);
  }

  deleteShop(shopId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${shopId}`);
  }
}
