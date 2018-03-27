import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductDetailService {

  constructor(private http: Http,router:Router,securityService:SecurityService) {
    
          this.security = securityService;
       }
  private headers = new Headers({'Content-Type': 'application/json'}); 
  security:SecurityService;
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  getProduct(id:number):Promise<any>
  {
		return this.http
      .post('http://127.0.0.1:3000/customer/getProduct', {data:this.security.encrypt(id.toString())}, {headers: this.headers})
      .toPromise()
      .then(response => {
        return JSON.parse(this.security.decrypt(response["_body"]))
	  })
      .catch(this.handleError);
  }
}
