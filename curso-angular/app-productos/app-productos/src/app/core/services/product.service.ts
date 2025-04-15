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
interface deleteResponse{
  isDeleted: boolean;
  deleteOn: string;
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
  getDetails(id:string): Observable<Product>{
    return this._Http.get<Product>(`${this.url}/products/${id}`)
  }
  addProducts(producto: Product): Observable<Product>{
    return this._Http.post<Product>(`${this.url}/products/add`,producto)
  }
  editProducts(id:string, product:Product): Observable<Product>{
    return this._Http.put<Product>(`${this.url}/products/${id}`,product)
  }
  deleteProduct(id: number): Observable<Product&deleteResponse>{
    return this._Http.delete<Product&deleteResponse>(`${this.url}/product/${id}`)
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
