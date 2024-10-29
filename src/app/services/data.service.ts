import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }

  // Get all products
  GetAllProducts():Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products')
  }

  // Get One Product
  GetOneProduct(productId:number):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/${productId}`)
  }

    // Get all Categories
    GetAllCategories():Observable<any>{
      return this._HttpClient.get('https://fakestoreapi.com/products/categories')
    }


  // Get One Category
  GetOneCategory(category:string):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/category/${category}`)
  }

  // Sort Products
  SortProducts():Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products?sort=desc')
  }

}
