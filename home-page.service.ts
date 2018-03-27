import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Router, Resolve, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import 'rxjs/add/operator/catch';
@Injectable()
export class HomePageService   {

  constructor(private http: Http,router:Router,securityService:SecurityService) {

      this.security = securityService;
   }
   static categories = []
   private categories = new Subject<any[]>();
   static loading = new Subject<boolean>();
   static getKey = new Subject<boolean>();
  static previousURL;
  static currentURL;
  static keyRecieved:boolean = false;
  security:SecurityService;
  private headers = new Headers({'Content-Type': 'application/json'}); 
 
  

  getCategories():Promise<any>
  {
    HomePageService.loading.next(true);
    return this.http.get(`http://127.0.0.1:3000/customer/categories`)
    .toPromise()
    .then(response => 
      {
        SecurityService.key = JSON.parse(response["_body"]).key;
        this.categories.next(JSON.parse(this.security.decrypt(JSON.parse(response["_body"]).data)));
        
        HomePageService.categories = JSON.parse(this.security.decrypt(JSON.parse(response["_body"]).data));
        HomePageService.loading.next(false);
        HomePageService.getKey.next(true)
        HomePageService.keyRecieved  = true;
        return JSON.parse(this.security.decrypt(JSON.parse(response["_body"]).data));
      }
  )
    .catch(this.handleError);
  }

  getTopOffersProducts()
  {
       
       return this.http.get(`http://127.0.0.1:3000/customer/homePageTopOffers`)
                 .toPromise()
                 .then(response =>{ 
                    console.log(response)
                    return JSON.parse(this.security.decrypt((<any>response)._body))
                  })
                 .catch(this.handleError);
    
  }

  getLatestProducts():Promise<any>
  {
    
       return this.http.get(`http://127.0.0.1:3000/customer/homePageLatestProducts`)
                 .toPromise()
                 .then(response => JSON.parse(this.security.decrypt((<any>response)._body)) )
                 .catch(this.handleError);
    
  }

  getPopularProducts():Promise<any>
  {
    
       return this.http.get(`http://127.0.0.1:3000/customer/homePagePopularProducts`)
                 .toPromise()
                 .then(response => JSON.parse(this.security.decrypt((<any>response)._body)) )
                 .catch(this.handleError);
    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
