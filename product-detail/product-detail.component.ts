import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../security.service'
import { ProductDetailService } from '../product-detail.service';
import { HomePageService } from '../home-page.service';
import { filter } from 'rxjs/operators';

import {UserService} from '../user.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {

  userService:UserService;
  constructor(userService:UserService,private router: Router,private route: ActivatedRoute,private securityService:SecurityService,productDetailService:ProductDetailService) 
  {
      this.security = securityService;
      this.productDetailService = productDetailService;
      this.userService = userService;
  }
  
  private security:SecurityService;
  private subscribeRoute:any;
  private selectedImage:number = 0 ;
  private selectedSize:number ;
  private _id:number;
  private data:string;
  private productDetailService:ProductDetailService;
  private error:any={};
  private product:any;
  private sizeError:boolean = false;
  saveToWishlist()
  {
    if(localStorage.getItem("token"))
    {
      HomePageService.loading.next(true);
      this.userService.addProductToWishlist(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),_id:this.product.id||this.product._id}))).
      then(data=>
      {
        console.log(data)
        HomePageService.loading.next(false);
        let welcome = document.getElementById("snackbar")
        welcome.className = "show";
        welcome.innerHTML = "Product Added To Wishlist";
        setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
        
      });
    }
    if(!localStorage.getItem("token"))
    {
      this.router.navigate(['login']);
    }
    
  }
  addToBag()
  {
    if(!this.selectedSize)
    {
      let welcome = document.getElementById("size-menu")
      welcome.className = "size-menu";
      this.sizeError = true;
      setTimeout(function(){ welcome.className = welcome.className.replace("size-menu", ""); }, 1000);
    }
    else
    {
      this.sizeError = false;
    if(!localStorage.getItem("token"))
    {
      HomePageService.loading.next(true)
        
        let cart;
        try
        {
          cart = JSON.parse(this.security.decrypt(localStorage.getItem("cart")));
        }
        catch(err)
        {
          console.log(err)
          cart = [];
        }
        console.log(cart)
        let i;
        for(i=0;i<cart.length;i++)
        {
          if((cart[i]._id==this.product.id||this.product._id)&&cart[i].size==this.product.size_quantity[this.selectedSize].size)
          break;
        }
        if(i==cart.length)
        {
          UserService.totalCartProducts.next({totalCartProducts:1})
          cart.push({_id:this.product.id||this.product._id,size:this.product.size_quantity[this.selectedSize].size,quantity:1});
          localStorage.setItem("cart",this.security.encrypt(JSON.stringify(cart)))
        }
        
        let welcome = document.getElementById("snackbar")
        HomePageService.loading.next(false)
        welcome.className = "show";
        welcome.innerHTML = "Product Added To Bag";
        setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);

    }
    if(localStorage.getItem("token"))
    {
        HomePageService.loading.next(true)
        this.userService.addProductToCart(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),cart:{_id:this.product.id||this.product._id,size:this.product.size_quantity[this.selectedSize].size,quantity:1}}))).
        then(data=>{
          console.log(data)
          if(data=="Added")
          UserService.totalCartProducts.next({totalCartProducts:1})
            let welcome = document.getElementById("snackbar")
            welcome.className = "show";
            HomePageService.loading.next(false)
            welcome.innerHTML = "Product Added To Bag";
            setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
            
          

        })
      }
   }
  }


  ngOnInit() {
 
    let load = true;
    let firstTimeLoading = true;

    HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
        firstTimeLoading = false;
    load = false;
    this.subscribeRoute = this.route.params.subscribe(params => {
      this._id = +params['id'];
      this.data = params['data'];
      if(this.security.decrypt(this.data)!=params['id'])
      {
        this.error = null;
      }
      else
      {
          this.productDetailService.getProduct(this._id).then(data =>
          {
              this.product = data;
          })
      }
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
