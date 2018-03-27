import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { HomePageService } from './home-page.service';

@Injectable()
export class AuthGuardService implements CanActivate,CanLoad {

  router:Router
  constructor(router:Router) {this.router = router}
 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route)
    console.log(state)
    if(localStorage.getItem("token"))
    {
      if(HomePageService.previousURL)
      this.router.navigateByUrl(HomePageService.previousURL);
      else
      this.router.navigate(['/home']);
    }
    else
    {
      return true;
    }
    return false;
  }


  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    console.log(url)
    if(localStorage.getItem("token"))
    return true;
    else
    this.router.navigate(['/login']);
    return false; 
  }
}
