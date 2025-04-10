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
  uploadFiles(filesList: File[]): Observable<any>{
    const formData = new FormData()
    filesList.forEach((file,index)=>{
      formData.append(`file${index}`, file)
    })
    return this._Http.post(`${this.url}/add/images/195`,formData)
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
