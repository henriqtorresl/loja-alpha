import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProductDto } from '../interfaces/CreateProductDto';
import { Product } from '../interfaces/Product';
import { UpdateProductDto } from '../interfaces/UpdateProductDto';
import { HeadersService } from './headers.service';

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
    private httpClient: HttpClient,
    private headersService: HeadersService
  ) { }

  createProduct(body: CreateProductDto): Observable<any> {
    const headers = this.headersService.getHeaders();

    return this.httpClient.post(`${this.api}/create-product`, body, { headers }).pipe(take(1));
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.headersService.getHeaders();

    return this.httpClient.get<GetAllProductsResponse>(`${this.api}/get-all-products`, { headers }).pipe(
      take(1),
      map((response: GetAllProductsResponse) => response.data.products)
    );
  }

  getOneProduct(productId: number): Observable<any> {
    const headers = this.headersService.getHeaders();

    return this.httpClient.get(`${this.api}/get-one-product/${productId}`, { headers }).pipe(
      take(1),
      map((response: any) => response.data)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = this.headersService.getHeaders();

    return this.httpClient.delete(`${this.api}/delete-product/${productId}`, { headers }).pipe(take(1));
  }

  updateProduct(productId: number, body: UpdateProductDto): Observable<any> {
    const headers = this.headersService.getHeaders();

    return this.httpClient.patch(`${this.api}/update-product/${productId}`, body, { headers }).pipe(take(1));
  }

}
