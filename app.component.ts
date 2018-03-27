import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router , NavigationEnd ,NavigationStart  }from '@angular/router';
import { HomePageService } from './home-page.service';
import { Search } from './search'
import { SecurityService } from './security.service';
import { UserService } from './user.service';
import { tokenKey } from '@angular/core/src/view/util';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
   animations: [
    trigger('dropdown', [
     
      transition('void => *', [ 
        state('in', style({transform: 'translateX(0)'})),
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
    
    goToTopInterval:any;
    homePageService:HomePageService;
    search:Search;
    security:SecurityService;
    loading = true ;
    totalCartProducts:number = 0;
    userName:string = '';
    userEmail:string = '';
    navBar:any;
    loggedIn:boolean = false;
    navLinks = ['home','cart','address','payment']
    constructor(private cd: ChangeDetectorRef,private router: Router,homePageService:HomePageService,security:SecurityService,private userService:UserService) {
        
        this.homePageService = homePageService;
        this.security = security;
        HomePageService.getKey.next(false);
        this.homePageService.getCategories().then(data =>
            {
                this.categories = data;
                HomePageService.getKey.next(true);
                console.log(data[0])
            }
            )
                    
    }
    logout()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        location.reload();
    }
    onScroll(event:any) 
    {
        if (document.getElementById('main-outlet').scrollTop > 400) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
    topFunction() 
    {
        let x;
        let this1 = this;
        this.goToTopInterval = setInterval(function() {
             x = document.getElementById('main-outlet').scrollTop = Math.max(document.getElementById('main-outlet').scrollTop-50,0);
            console.log(x)
            if(x==0&&this1.goToTopInterval)
            {
                clearInterval(this1.goToTopInterval)
            }
        }, 10);

       
       

    }
    clear()
    {
        console.log("hello")
       
    }

    categories:any[] = [];
	ngOnInit()
	{
		this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            if(evt.url.indexOf('not-found')==-1)
            {
                console.log(evt.url);
                if(evt.url.endsWith('cart')||evt.url.endsWith('address')||evt.url.endsWith('payment'))
                {
                    this.navBar = false;
                }
                else
                this.navBar = true;
                HomePageService.previousURL = HomePageService.currentURL;
                HomePageService.currentURL = evt.url;
            }
            document.getElementById('main-outlet').scrollTop = 0;
          
        });

        HomePageService.loading.subscribe(data =>{
            
            let th = this;
            setTimeout(function(){th.loading = data;},0)
        })
        UserService.totalCartProducts.subscribe(data =>
            {
                console.log(data)
                
                if(data.loggedIn)
                {
                    this.totalCartProducts = data.totalCartProducts;
                    
                        this.userName = data.name;
                        this.userEmail = data.email;
                        this.loggedIn = data.loggedIn;
                    
                    
                }
                else
                {
                    this.totalCartProducts = this.totalCartProducts+data.totalCartProducts;
                }
                
            }
            )
            let firstTimeLoading = true;
        HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
            firstTimeLoading = false;
            if (typeof(Storage) !== "undefined") 
            {
              if(localStorage.getItem("token"))
              {
                this.userService.login(this.security.encrypt(JSON.stringify({token:localStorage.getItem("token")}))).then(data =>
                {
                    if(data.success)
                    {
                        this.userEmail = data.email;
                        this.userName = data.name;
                        this.totalCartProducts = data.totalCartProducts;
                        this.loggedIn = true;
                    }
                }
                )
              }
              else if(localStorage.getItem("cart"))
              {
                try
                {
                    this.totalCartProducts = JSON.parse(this.security.decrypt(localStorage.getItem("cart"))).length;
                }
                catch(err)
                {

                }
              }
            }
            
        })


	}

}