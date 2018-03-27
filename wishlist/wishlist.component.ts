import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomePageService} from '../home-page.service';
import { filter } from 'rxjs/operators';
import {UserService} from '../user.service';
import {SecurityService} from '../security.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products:any[] = [];
  constructor(private security:SecurityService,private userService:UserService,private router: Router) {

  
    if(!localStorage.getItem("token"))
    {
      if(HomePageService.previousURL)
      this.router.navigateByUrl(HomePageService.previousURL);
      else
      this.router.navigate(['/home']);
    }
    
   }
   productAddedToCart(index:any,data:any)
   {
    
    this.userService.removeWishlistProducts(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),_id:[data._id]}))).then(data1 =>
      {
          console.log(data)
          this.products.splice(index,1);
          HomePageService.loading.next(false);
          let welcome = document.getElementById("snackbar")
          welcome.className = "show";
          welcome.innerHTML = data.action;
          setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
      });
      
   }
   isMobileDevice() 
   {
     let testExp = new RegExp('Android|webOS|iPhone|iPad|' +
     'BlackBerry|Windows Phone|'  +
     'Opera Mini|IEMobile|Mobile' , 
     'i');
 
     if (testExp.test(navigator.userAgent))
       return true;
     else
       return false;
   };
  ngOnInit() 
  {
    let load = true;
    let firstTimeLoading = true;
    HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
    firstTimeLoading = false;
    load = false;
    if(localStorage.getItem("token"))
    this.userService.getWishlistProducts(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token")}))).then(data =>
    {
        console.log(data)
        this.products = data;
    });

    });
    setTimeout(function()
    {
      if(HomePageService.keyRecieved&&load)
      {
        HomePageService.getKey.next(true);
      }
    },10)
  }

}
