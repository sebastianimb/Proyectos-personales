import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http"
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
interface postResponse {
  userId: number,
  id: number,
  title: string,
  body: string
}
@Injectable()
export class PeticionesService{
  public url: string
  constructor(private _Http: HttpClient){
    this.url = 'https://jsonplaceholder.typicode.com/posts'
  }
  getPost():Observable<postResponse[]>{
    return this._Http.get<postResponse[]>(this.url)
  }
}
