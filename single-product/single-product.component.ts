import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {UserService} from '../user.service';
import {SecurityService} from '../security.service'
import { HomePageService } from '../home-page.service';
import { Router }from '@angular/router';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  security:SecurityService;
  userService:UserService;
  constructor(private router: Router,securityService:SecurityService,userService:UserService) {
    this.userService = userService;
    this.security = securityService;
   }
  @Input() product:any;
  @Input() wishlist:boolean = false;
  @Output() productAdded = new EventEmitter<any>();
  
  ngOnInit() {
  }

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
  removeFromWishlist()
  {
    this.productAdded.emit({_id:this.product.id||this.product._id,action:"Product Removed"})
  }
  addToBag(size:any)
  {
    if(!localStorage.getItem("token"))
    {
        console.log(this.product)
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
        let i;
        for(i=0;i<cart.length;i++)
        {
          if((cart[i]._id==this.product.id||this.product._id)&&cart[i].size==size)
          break;
        }
        if(i==cart.length)
        {
          UserService.totalCartProducts.next({totalCartProducts:1})
          cart.push({_id:this.product.id||this.product._id,size:size,quantity:1});
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
      this.userService.addProductToCart(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),cart:{_id:this.product.id||this.product._id,size:size,quantity:1}}))).
      then(data=>{
        console.log(data)
        if(data=="Added")
        UserService.totalCartProducts.next({totalCartProducts:1})
        if(!this.wishlist)
        {
          let welcome = document.getElementById("snackbar")
          HomePageService.loading.next(false)
          welcome.className = "show";
          welcome.innerHTML = "Product Added To Bag";
          setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
          
        }
        else
        this.productAdded.emit({_id:this.product.id||this.product._id,action:"Product Added To Bag"})
      })
    }
  }
}
