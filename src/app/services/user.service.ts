import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }


  //add user 
  public addUser(user:any) {
    return this.http.post(`${baseUrl}/user/`,user)
  }

    //generate order
    public generateOrder(payments:any){
      return this.http.post(`${baseUrl}/api/create-order/`,payments);
  }

    // Update payment on server
    // public updatingPaymentServer(data:any){
    //   console.log("In service");
    //   return this.http.post(`${baseUrl}/api/update-order/`,data);
    // }


  // public ajaxFunction(amounts:any){
  //   return this.http.post(`${baseUrl}/user/create_order/`,amounts)
  // }
}
