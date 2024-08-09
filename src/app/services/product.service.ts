import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProductDto } from '../interfaces/CreateProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly api: string = `${environment.api}/api/products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  createProduct(body: CreateProductDto): Observable<any> {
    return this.httpClient.post(`${this.api}/create-product`, body).pipe(take(1))
  }

}
