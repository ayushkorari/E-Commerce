import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { SecurityService } from './security.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,tap,map } from 'rxjs/operators';
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient,private http: Http,router:Router,securityService:SecurityService)
  {
     this.security = securityService;
  }
  security:SecurityService;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private headers = new Headers({'Content-Type': 'application/json'}); 
  static totalCartProducts = new Subject<any>();

  getAddress()
  {
    return this.httpClient.get('http://127.0.0.1:3000/user/getAddress')
    .pipe( map(data=>
      {
        
        
        return (JSON.parse(this.security.decrypt(data)))
        
      }
      ),
      catchError(err=>this.handleError(err))
    );
  }
  login(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/login', {data:data}, {headers: this.headers})
    .toPromise()
    .then(res => {
      res = JSON.parse((<any>res)._body);
      if((<any>res).url)
      window.location.href = (<any>res).url;
      if (typeof(Storage) !== "undefined"&&(<any>res).token) 
      {
        localStorage.setItem("token", (<any>res).token );
      }
      return res;
  })
    .catch(this.handleError);
  }


  register(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/register', {data:data}, {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log(res)
      res = JSON.parse((<any>res)._body);
      if((<any>res).url)
      window.location.href = (<any>res).url;
      return res;
  })
    .catch(this.handleError);
  }

  forgetPassword(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/forgetPassword', {data:data}, {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log(res)
      res = JSON.parse((<any>res)._body);
      if((<any>res).url)
      window.location.href = (<any>res).url;
      return res;
  })
    .catch(this.handleError);
  }
  getCartProducts(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/getCartProducts', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return JSON.parse(this.security.decrypt((<any>response)._body))
  })
    .catch(this.handleError);
  }

  getWishlistProducts(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/getWishlistProducts', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return JSON.parse(this.security.decrypt((<any>response)._body))
  })
    .catch(this.handleError);
  }
  removeWishlistProducts(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/removeWishlistProducts', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return (<any>response)._body;
  })
    .catch(this.handleError);
  }
  updateCartProducts(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/updateCartProducts', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return JSON.parse(this.security.decrypt((<any>response)._body))
  })
    .catch(this.handleError);
  }

  removeCartProducts(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/removeCartProducts', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return (<any>response)._body
  })
    .catch(this.handleError);
  }

  addProductToCart(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/addProductToCart', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return response["_body"];
  })
    .catch(this.handleError);
  }
  addProductToWishlist(data:any):Promise<any>
  {
    return this.http
    .post('http://127.0.0.1:3000/user/addProductToWishlist', {data:data}, {headers: this.headers})
    .toPromise()
    .then(response => {
      return response["_body"];
  })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
