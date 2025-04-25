import { HttpParams } from '@angular/common/http';

export const GLOBAL = {
  baseUrl: 'https://dummyjson.com',
  headers: {
    'Authorization': 'Bearer ',
    'Content-Type': 'application/json'
  },
  params: new HttpParams()
    .set('limit', '10')
    .set('skip', '0')
};
