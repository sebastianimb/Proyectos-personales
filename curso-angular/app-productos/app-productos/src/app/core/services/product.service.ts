import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Producto } from "../models/product.model";
import { GLOBAL } from "./global";
interface ProductsResponse {
  products: Producto[];
  total: number;
  skip: number;
  limit: number;
}
@Injectable()
export class ProductService{
  constructor(private _Http: HttpClient){}
  getProducts(): Observable<ProductsResponse>{
    return this._Http.get<ProductsResponse>(`${GLOBAL.baseUrl}/products`)
  }
}
