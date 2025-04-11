import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/Model/Product';
import { map } from 'rxjs/operators';
import { IPagination } from '../shared/Model/pagination';
import { Icategory } from '../shared/Model/category';
import { ShopParams } from '../shared/Model/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  baseURL = 'https://localhost:44390/api/';

  constructor(private http: HttpClient) {

  }

  getProduct(shopParams:ShopParams) {
    let params = new HttpParams();
    if (shopParams.CategoryId) {
      params = params.append('categoryId', shopParams.CategoryId);
    }
    if (shopParams.SearchTerm) {
      params = params.append('searchByProductName', shopParams.SearchTerm);
    }
    if (shopParams.Sort) {
      params = params.append('sort', shopParams.Sort);
    }
    if(shopParams.PageNumber) {
      params = params.append('pageNumber', shopParams.PageNumber.toString());
    }
    if(shopParams.PageSize) {
      params = params.append('pageSize', shopParams.PageSize.toString());
    }
    return this.http.get<IPagination>(this.baseURL + 'Products/get-all-products', { observe: 'response', params })
      .pipe(map(response => {
        return response.body;
      }))
  }

  getProductById(id: string) {
    return this.http.get<IProduct>(this.baseURL + 'Products/get-product-by-id/' + id);
  }

  getCategories() {
    return this.http.get<Icategory[]>(this.baseURL + 'Categories/get-all-categories');
  }
}
