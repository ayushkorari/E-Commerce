
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserService} from '../user.service';
import {SecurityService} from '../security.service';
import {HomePageService} from '../home-page.service';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit, ErrorStateMatcher {

constructor(private router: Router,private userService:UserService,private security:SecurityService) {

  
 }

totalAddedProductsToCart = 0;
answer: string;
answerDisplay: string;
showSpinner: Boolean = false;
hide = true;
mobile_pattern="[1-9]{1}[0-9]{9}";
forgetPassword = false;
loginForm = new FormGroup({
  email :new FormControl('', [Validators.required, Validators.email]),
  password : new FormControl('', [Validators.required])
});

registrationForm = new FormGroup({
registrationId : new FormControl('', [Validators.required, Validators.email]),
registrationPassword : new FormControl('', [Validators.required]),
name : new FormControl('', [Validators.required]),
mobile : new FormControl('', [Validators.required,Validators.pattern(this.mobile_pattern)]),
gender : new FormControl('', [Validators.required])
});

isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

  const isSubmitted = form && form.submitted;

  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));

}
authenticatePassword(field:any)
{
  return field.hasError('required') ? 'You must enter a value' :(field.hasError('email') ? 'Not a valid password' :'');
}

authenticateName(field:any)
{
  return field.hasError('required') ? 'You must enter a value' :(field.hasError('email') ? 'Not a valid Name' :'');
}

 

authenticateEmail(field:any) {

return field.hasError('required') ? 'You must enter a value' :(field.hasError('email') ? 'Not a valid email' :'');

}

register()
{
  HomePageService.loading.next(true)
  this.userService.register(this.security.encrypt(JSON.stringify({email:this.registrationForm.controls.registrationId.value,password:this.registrationForm.controls.registrationPassword.value,name:this.registrationForm.controls.name.value,gender:this.registrationForm.controls.gender.value,mobile:this.registrationForm.controls.mobile.value}))).then(data=>
  {
    HomePageService.loading.next(false)
    if(data.failure)
    {
      let showError = document.getElementById("snackbar")
      showError.className = "show";
      showError.innerHTML = "you are already registered with this email or mobile number."
      setTimeout(function(){ showError.className = showError.className.replace("show", ""); }, 3000);
    }
  });

  
}

forget_Password()
{
  HomePageService.loading.next(true)
  this.userService.forgetPassword(this.security.encrypt(JSON.stringify({email:this.loginForm.controls.email.value}))).then(data=>
    {
      HomePageService.loading.next(false)
      if(data.failure)
      {
        let showError = document.getElementById("snackbar")
        showError.className = "show";
        showError.innerHTML = "This Email Is Not Registered"
        setTimeout(function(){ showError.className = showError.className.replace("show", ""); }, 3000);
      }
    });
  
}

add_Product_To_User_Cart_After_Login(cart:any[])
{
  
      console.log("add_produxt")
      
      this.userService.addProductToCart(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token"),cart:{_id:cart[0].id||cart[0]._id,size:cart[0].size,quantity:cart[0].quantity}}))).
      then(data=>{
        console.log(cart)
        console.log(data)
        if(data == "Added")
        {
          this.totalAddedProductsToCart = this.totalAddedProductsToCart + 1 ;
        }
        if(cart.length>1)
        {
          cart = cart.splice(1);
          this.add_Product_To_User_Cart_After_Login(cart);
        }
        else
        {
          UserService.totalCartProducts.next({totalCartProducts:this.totalAddedProductsToCart})
          if(HomePageService.previousURL)
          this.router.navigateByUrl(HomePageService.previousURL);
          else
          this.router.navigate(['/home']);
        }
      })
  
}

login()
{
  HomePageService.loading.next(true)
  this.userService.login(this.security.encrypt(JSON.stringify({email:this.loginForm.controls.email.value,password:this.loginForm.controls.password.value}))).then(data=>
  {
    HomePageService.loading.next(false)
    if(!data.url)
    {
      if(!data.success)
      {
        let showError = document.getElementById("snackbar")
        showError.className = "show";
        showError.innerHTML = "Invalid Login id or password"
        setTimeout(function(){ showError.className = showError.className.replace("show", ""); }, 3000);
      }
      else
      {
        let welcome = document.getElementById("snackbar")
        welcome.className = "show";
        welcome.innerHTML = "Welcome "+data.name
        setTimeout(function(){ welcome.className = welcome.className.replace("show", ""); }, 3000);
        UserService.totalCartProducts.next({totalCartProducts:data.totalCartProducts,loggedIn:true,name:data.name,email:data.email})
        if(localStorage.getItem("cart"))
        {
          console.log("cart")
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
          if(cart.length>0)
          {
            this.add_Product_To_User_Cart_After_Login(cart);
          }
        }
        else
        {
          console.log("No Cart")
          if(HomePageService.previousURL)
          this.router.navigateByUrl(HomePageService.previousURL);
          else
          this.router.navigate(['/home']);
        }
      }
    }
  });
  
  
}

resetTabs()
{
  this.loginForm.reset();
  this.registrationForm.reset();
  this.forgetPassword = false;
}

ngOnInit() 
{

}





}

