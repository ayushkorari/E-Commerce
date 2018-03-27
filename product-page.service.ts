import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import 'rxjs/add/operator/catch';
import { HomePageService } from './home-page.service';

@Injectable()
export class ProductPageService {

  constructor(private http: Http,router:Router,securityService:SecurityService) { 

    this.security = securityService;
  }

  private headers = new Headers({'Content-Type': 'application/json'}); 
  security:SecurityService;
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
 
  getProductsList(data:any):Promise<any>
  {
    HomePageService.loading.next(true);
		return this.http
      .post('http://127.0.0.1:3000/customer/getProductsList', {data:this.security.encrypt(JSON.stringify(data))}, {headers: this.headers})
      .toPromise()
      .then(response => {
        HomePageService.loading.next(false);
        return JSON.parse(this.security.decrypt(response["_body"]))
	  })
      .catch(this.handleError);
  }
}
