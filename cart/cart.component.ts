import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SecurityService } from '../security.service';
import { HomePageService } from '../home-page.service';
import { filter } from 'rxjs/operators';
import { Router }from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  couponDiscount : number = 0;
  products:any[]=[]
  userService:UserService;
  security:SecurityService;
  totalAmount:number = 0;
  totalDiscount:number = 0;
  productQuantities:any[] = [1,2,3,4,5,6,7,8,9,10];
  someProductsUnavailable:boolean = false;
  constructor(userService:UserService,security:SecurityService,private router: Router) {
    this.userService = userService;
    this.security = security;
   }
  
  increaseQuantity(index:number)
  {
    this.products[index].quantity = this.products[index].quantity+1 ;
  }

  decreaseQuantity(index:number)
  {
    this.products[index].quantity = this.products[index].quantity+1 ;
  }

  applyCoupon()
  {
    this.couponDiscount = 1000 ;
  }
 
  removeCartProducts(product:any,action:string,index:number)
  {
    
    let welcome = document.getElementById("snackbar")
    if(!localStorage.getItem("token"))
    {
      if(action=="wishlist")
      {
        this.router.navigate(['login']);
      }
      else
      {
        HomePageService.loading.next(true)
          this.products.splice(index,1)
          let  cart = JSON.parse(this.security.decrypt(localStorage.getItem("cart")));
          cart.splice(index,1)
          localStorage.setItem("cart",this.security.encrypt(JSON.stringify(cart)))
          let available = this.products.filter(item=>item.available_products)
          this.calculateAmountAndDiscount(available);
          HomePageService.loading.next(false)
          UserService.totalCartProducts.next({totalCartProducts:-1})
          welcome.className = "";
          welcome.className = "show";
          welcome.innerHTML = "Product Removed"
          setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
      }
    }
    if(localStorage.getItem("token"))
    {
      HomePageService.loading.next(true)
      this.userService.removeCartProducts(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),_id:product.cart._id,size:product.cart.size,action:action}))).then(data =>
      {
        console.log("remove"+data)
        this.products.splice(index,1)
        let available = this.products.filter(item=>item.available_products)
        this.calculateAmountAndDiscount(available);
        HomePageService.loading.next(false)
        welcome.className = "";
        welcome.className = "show";
        welcome.innerHTML = action=="wishlist"?"Product Moved To Wishlist":"Product Removed"
        UserService.totalCartProducts.next({totalCartProducts:-1})
        setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
      });
    }
  }
  updateCartProducts(product:any,changed:string,index:number)
  {
    console.log(changed)
    if(changed=="size")
    {
      product.cart.quantity = 1;  
    }
    if(!localStorage.getItem("token"))
    {
      let cart;
      try
      {
        cart = JSON.parse(this.security.decrypt(localStorage.getItem("cart")));
        cart[index].size = product.cart.size;
        cart[index].quantity = product.cart.quantity;
        localStorage.setItem("cart",this.security.encrypt(JSON.stringify(cart)))
      }
      catch(err)
      {
        console.log(err)
        
      }
    }
      HomePageService.loading.next(true);
      this.userService.updateCartProducts(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),_id:product.cart._id,quantity:product.cart.quantity,size:product.cart.size}))).then(data =>
        {
          console.log(data)
          HomePageService.loading.next(false);
         
          if(data.length>0)
          {
            for(let i=0;i<product.product_info.size_quantity.length;i++)
            if(product.product_info.size_quantity[i].size == data[0].size_quantity[0].size)
            {
              product.product_info.size_quantity[i].size = data[0].size_quantity[0].size;
              product.product_info.size_quantity[i].quantity = data[0].size_quantity[0].quantity;
            }
            if(data[0].size_quantity[0].quantity>=product.cart.quantity)
            {
              product.available_products = true;
              console.log("true")
            }
            
            else
            {
              console.log("false")
              product.available_products = false;
            }
            this.couponDiscount = 0 ;
            let available = this.products.filter(item=>item.available_products)
            this.calculateAmountAndDiscount(available);
            console.log(available)
            if(available.length<this.products.length)
            this.someProductsUnavailable = true ;
            else
            this.someProductsUnavailable = false ;
          }
          
        }
        ) 
    
    
  }

  calculateAmountAndDiscount(available:any[])
  {
    this.couponDiscount = 0;
    this.totalAmount = 0;
    this.totalDiscount = 0;
    if(available.length>0)
    {
      
      for(let i=0;i<available.length;i++)
      {
        this.totalAmount = this.totalAmount + ( available[i].product_info.price * available[i].cart.quantity)
        
      }
      
      for(let i=0;i<available.length;i++)
      {
        
        this.totalDiscount = this.totalDiscount + (available[i].product_info.price*available[i].product_info.discount_percent * available[i].cart.quantity) /100
        
      }
      
      
    }
  }
  ngOnInit()
  {

  let load = true;
  let firstTimeLoading = true;

  HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
    firstTimeLoading = false;
    load = false;

  if(localStorage.getItem("token"))
    {
      HomePageService.loading.next(true)
      this.userService.getCartProducts(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token")}))).then(data =>
      {
        HomePageService.loading.next(false)
        let available = data.filter(item=>item.available_products)
        this.calculateAmountAndDiscount(available);
        
        this.products = data;
        console.log(available)
        if(available.length<data.length)
        this.someProductsUnavailable = true ;
      }
      )
    }
    else if(localStorage.getItem("cart"))
    {
      try
      {
        let  cart = JSON.parse(this.security.decrypt(localStorage.getItem("cart")));
        HomePageService.loading.next(true)
        this.userService.getCartProducts(this.security.encrypt(JSON.stringify({cart:cart}))).then(data =>
          {
            HomePageService.loading.next(false)
            let available = data.filter(item=>item.available_products)
            this.calculateAmountAndDiscount(available);
            
            this.products = data;
            console.log(available)
            if(available.length<data.length)
            this.someProductsUnavailable = true ;
          })
      }
      catch(err)
      {

      }
    }
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
