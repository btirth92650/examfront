import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor( private http:HttpClient) { }

  //Currentuser : Which is LoggedIn
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate Token

  public generateToken(loginData:any) 
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  /// Login user: set token in local storage
  public loginUser(token: any)
  {
    localStorage.setItem('token', token);
    return true;
  }
 
  //isLogin: user is Logged in or not
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr==null)
    {     
      return false;
    }else
    {
      return true;
    }
  }

    //Logout: remove token from local storage
    public logout()
    {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }

    // get token
    public getToken()
    {
      return localStorage.getItem('token');
    }

    //set userDetail
    public setUser(user:any)
    {
      localStorage.setItem('user',JSON.stringify(user));
    }

    //getUser
    public getUser()
    {
      let userStr = localStorage.getItem('user');
      if(userStr != null)
      {
        return JSON.parse(userStr);
      }else
      {
        this.logout();
        return null;
      }

      
    }
    //getUser Role
    public getUserRole()
    {
      let user = this.getUser();
      return user.authorities[0].authority; 
    }

  }

