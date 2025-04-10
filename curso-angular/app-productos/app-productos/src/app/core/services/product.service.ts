import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { GLOBAL } from "./global";
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
@Injectable()
export class ProductService{
  url:string
  constructor(private _Http: HttpClient){
    this.url = GLOBAL.baseUrl
  }
  getProducts(): Observable<ProductsResponse>{
    return this._Http.get<ProductsResponse>(`${this.url}/products`)
  }
  addProducts(producto: Product): Observable<Product>{
    return this._Http.post<Product>(`${this.url}/products/add`,producto)
  }
}
