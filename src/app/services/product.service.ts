import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProductDto } from '../interfaces/CreateProductDto';
import { Product } from '../interfaces/Product';

interface GetAllProductsResponse {
  data: {
    products: Product[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly api: string = `${environment.api}/api/products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  createProduct(body: CreateProductDto): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.post(`${this.api}/create-product`, body, { headers }).pipe(take(1));
  }

  getAllProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.get<GetAllProductsResponse>(`${this.api}/get-all-products`, { headers }).pipe(
      take(1),
      map((response: GetAllProductsResponse) => response.data.products)
    );
  }

  getOneProduct(productId: number): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.httpClient.get(`${this.api}/get-one-product/${productId}`, { headers }).pipe(
      take(1),
      map((response: any) => response.data)
    );
  }

}
