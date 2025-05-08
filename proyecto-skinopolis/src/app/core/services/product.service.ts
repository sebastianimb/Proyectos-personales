import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { GLOBAL } from './global';
import { inventory } from '../../../assets/fakedata/data';
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
interface deleteResponse {
  isDeleted: boolean;
  deleteOn: string;
}
@Injectable()
export class ProductService {
  url: string;
  public inventory: Product[] = [];
  constructor(private _Http: HttpClient) {
    this.url = GLOBAL.baseUrl;
  }
  getProducts(): Product[] {
    this.inventory = inventory;
    return this.inventory;
  }

  /*
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer token123')
  .set('Content-Type', 'application/json');

  const params = new HttpParams().set('category', 'electronics');

  this._Http.post<Product>(`${this.url}/products/add`, producto, {
  headers,
  params,
  responseType: 'json',
  observe: 'response'
  })
  */
}
