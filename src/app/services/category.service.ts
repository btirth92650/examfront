import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  title: any;

  constructor(private _http:HttpClient) { }

  //load all the  categories 
  public categories()
  {
    return this._http.get(`${baseUrl}/category/`)
  }
 
  //add new category
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`,category)
  }

  //Delete category
  public deleteCategory(cid:any){
    return this._http.delete(`${baseUrl}/category/${cid}`)
  }

    // updating category 
    public updatingCategory(category:any){
      return this._http.put(`${baseUrl}/category/`,category);
    }

      // get category by id
  public getCategoryById(cid){
    return this._http.get(`${baseUrl}/category/${cid}`);
  }
  
}

