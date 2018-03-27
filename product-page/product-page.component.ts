import { ViewChild,Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';
import { SecurityService } from '../security.service';
import { Search } from '../search';
import { ProductPageService } from '../product-page.service';
import { HomePageService } from '../home-page.service';
import { OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [
    trigger('filters', [
     
      transition('void => *', [ 
        state('in', style({transform: 'translateX(0)'})),
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('modal', [
      
       transition('void => *', [ 
         state('in', style({transform: 'translateY(0)'})),
         style({transform: 'translateY(-100%)'}),
         animate(300)
       ]),
       transition('* => void', [
         animate(300, style({transform: 'translateY(-100%)'}))
       ])
     ])
  ]
})
export class ProductPageComponent implements OnInit,OnDestroy {

  @ViewChild('slider') slider: any;
  constructor( location:Location,productPageService:ProductPageService,private securityService:SecurityService,private route: ActivatedRoute,private router:Router,home:HomePageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
    this.security = securityService ;
    this.productPageService = productPageService;
    this.homePageService = home;
    this.location = location;
   }
   private prices = new Subject<any[]>();
   loadMore:boolean = true;
   location:Location;
  homePageService:any;
  productPageService:ProductPageService;
  data:Search;
  subscribeRoute:any;
  security:SecurityService;
  showBrands = false ;
  showMenu = false ;
  menuFor = '';
  genders:any[] = [];

  sortingArray = [{value:'Discount',data:{discount_percent:-1}},{value:'Price Low to High',data:{price:1}},{value:'Price High to Low',data:{price:-1}},{value:'Popularity',data:{total_sold:-1}},{value:'New',data:{added_on:-1}}]
  discounts = [{value:10,checked:false},{value:20,checked:false},{value:30,checked:false},{value:40,checked:false},{value:50,checked:false},{value:60,checked:false},{value:70,checked:false},{value:80,checked:false},{value:90,checked:false},{value:100,checked:false}];
  discounts1 = [{value:10,checked:false},{value:20,checked:false},{value:30,checked:false},{value:40,checked:false},{value:50,checked:false},{value:60,checked:false},{value:70,checked:false},{value:80,checked:false},{value:90,checked:false},{value:100,checked:false}]
  priceRange = [0,200000] ;
  priceRange1 = [0,10000] ;
  priceRange2 = [] ;
  showFilters : boolean = true ;
  brands:any[] = [];
  products:any[]= [];
  categories:any[] = [];
  mode = new FormControl('side');
  colors:any[] = [];
  productCounts = 0;
  subscibeCategories:any;
  sortBy:any;
  token:string = '';
  param:string = '';
  priceChangeEnabled:boolean = false;
  loadMoreProducts()
  {
    this.data.skip = this.data.skip + 10; 
    // this.changeUrl();
    this.productPageService.getProductsList({data:this.data.skip,key:'skip',token:this.token}).then(data =>
      {
        console.log(data)
        this.products = this.products.concat(data.data) 
        this.loadMore = data.data.length>=10&&this.products.length<this.productCounts;
      });
  }
  changeUrl()
  {
    this.data.skip = 0;
    let data = this.security.encrypt(JSON.stringify(this.data))
    const url = this
    .router
    .createUrlTree([{data: data}], {relativeTo: this.route})
    .toString();
    this.location.go(url)
  }

  changeBrands()
  {
    let brands = this.brands.filter(data=>data.checked)
    this.data.brands = brands.map(data=>data.brand_name)
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.brands,key:'brands',token:this.token}).then(data =>
      {
        this.afterDataRecieved(data);
      });
  }

  priceUpdate = this.prices.debounceTime(300).distinctUntilChanged() 
  .switchMap(data =>
  {
    console.log("price chaged")
    if(data)
    {
      this.data.minPrice = data[0];
      this.data.maxPrice = data[1];
      this.changeUrl();
      console.log(data)
      let key = '';
      if(data[0]!=this.priceRange2[0])
      key = "minPrice";
      if(data[1]!=this.priceRange2[1])
      key = "maxPrice";
      this.productPageService.getProductsList({data:this.data[key],key:key,token:this.token}).then(data =>
        {
          this.afterDataRecieved(data);
        });
    }
    return data;
  }).subscribe()

  updatePriceRange(price:any)
  {
      if(this.priceChangeEnabled)
      {
        console.log(price)
        this.prices.next(price);  
      }

  }

  getRefreshedProductList()
  {
    let data = Object.assign({}, this.data)
    data['token'] = this.token;
  }
  changeDiscounts()
  {
    let discounts = this.discounts.filter(data=>data.checked)
    this.data.discount = discounts.map(data=>data.value)
    
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.discount,key:'discount',token:this.token}).then(data =>
      {
        // this.priceRange = [0,200000]
        // this.priceRange1 = [0,100] ;
        this.afterDataRecieved(data);
      });
  }
  changeSorting()
  {
    
    this.data.sorting = this.sortBy.data;
    
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.sorting,key:'sorting',token:this.token}).then(data =>
      {
        // this.priceRange = [0,200000]
        // this.priceRange1 = [0,100] ;
        this.afterDataRecieved(data);
      });
  }
  changeColors()
  {
    
    let colors = this.colors.filter(data=>data.checked)
    this.data.colors = colors.map(data=>data.color_name)
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.colors,key:'colors',token:this.token}).then(data =>
      {
        this.afterDataRecieved(data);
      });
  }

  changeCategories()
  {
    this.data.subCategory = [];
    let categories = this.categories.filter(data=>data.checked)
    for(let i=0;i<categories.length;i++)
    {
      this.data.subCategory = this.data.subCategory.concat(categories[i]._id)
      console.log(this.data.subCategory)
    }
    
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.subCategory,key:'subCategory',token:this.token}).then(data =>
      {
        this.afterDataRecieved(data);
      });
  }
  changeGenders()
  {
    
    let genders = this.genders.filter(data=>data.checked)
    this.data.gender = genders.map(data=>data.gender_name)
    console.log(this.data.gender)
    this.changeUrl();
    this.productPageService.getProductsList({data:this.data.gender,key:'gender',token:this.token}).then(data =>
      {
        this.afterDataRecieved(data);
      });
  }
  goToProductDetailPage(id)
  {
    
    this.router.navigate(['product-detail',id.toString(),this.security.encrypt(id.toString())]);
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

  afterDataRecieved(data)
  {
    this.token = data.token;
    if(data.data)
    {
    this.discounts  = this.discounts1;
    this.products = data.data;
    console.log(data.sideData.category)
   
    let brands = [];
    let colors = [];
    let gender = [];
    for(let i=0;i<data.sideData.brands.length;i++)
    brands.push({brand_name:data.sideData.brands[i],checked:false})

    for(let i=0;i<data.sideData.colors.length;i++)
    colors.push({color_name:data.sideData.colors[i],checked:false})
    
    for(let i=0;i<data.sideData.gender.length;i++)
    {
      gender.push({gender_name:data.sideData.gender[i],checked:false})
    }
    let categories1 = HomePageService.categories.filter(data => this.data.category.indexOf(data.parent)>=0)
    
    let categories = categories1.filter(data1 => data.sideData.category.indexOf(data1._id)>=0)
    console.log("cat"+JSON.stringify(categories1))
    
    let cat1 = HomePageService.categories.filter(data1 =>data.sideData.category.indexOf(data1._id)>=0&&categories1.map(data=>data._id).indexOf(data1.parent)>=0).map(data=>data.parent)

    let cat2 = HomePageService.categories.filter(data1 => cat1.indexOf(data1._id)>=0)
     categories = categories.concat(cat2)
     
     var group_to_values = categories.reduce(function (obj, item) {
      obj[item.category_name] = obj[item.category_name] || [];
      obj[item.category_name].push(item._id);
      return obj;
  }, {});
  
  var groups = Object.keys(group_to_values).map(function (key) {
      return {category_name: key, _id: group_to_values[key]};
  });
  
  categories = groups;
  
  //   for(let i=0;i<cat.length;i++)

  //  {
  //    let j;
  //   for(j=0;j<categories.length;j++)
  //   {
  //     if(categories[j]._id==cat[i].parent)
  //     {
  //       break;
  //     }
  //   }
  //   if(j!=categories.length)
  //   categories.push(cat[i])
  // }
    for(let i=0;i<categories.length;i++)
    {
      if(this.data.subCategory.indexOf(categories[i]._id[0])>=0)
        categories[i]['checked'] = true;
      else
        categories[i]['checked'] = false;
    }
    this.categories = categories;
    console.log(categories)
    for(let i=0;i<brands.length;i++)
    if(this.data.brands.indexOf(brands[i].brand_name)>=0)
    brands[i].checked = true ;

    for(let i=0;i<colors.length;i++)
    if(this.data.colors.indexOf(colors[i].color_name)>=0)
    colors[i].checked = true ;
    if(this.data.gender.length!=1||this.genders.length>1||gender.length>1)
    for(let i=0;i<gender.length;i++)
    if(this.data.gender.indexOf(gender[i].gender_name)>=0)
    gender[i].checked = true ;

    this.priceChangeEnabled = false;
    if(data.sideData.minPrice!=data.sideData.maxPrice&&this.slider)
    this.slider.slider.updateOptions({ start: [data.sideData.minPrice1, data.sideData.maxPrice1], range: { min: data.sideData.minPrice, max: data.sideData.maxPrice } });

    else
     {
        this.priceRange = [data.sideData.minPrice,data.sideData.maxPrice];
        this.priceRange1 =  [data.sideData.minPrice1,data.sideData.maxPrice1];
 
     }
    this.priceRange1[1] = data.sideData.maxPrice1;
    this.priceRange1[0] = data.sideData.minPrice1;
    this.priceRange2 = this.priceRange1;
    this.priceChangeEnabled = true;
    this.productCounts = data.count;
    this.loadMore = data.data.length>=10&&this.products.length<this.productCounts;
    this.brands = brands;
    this.colors = colors;
    this.genders = gender;
    let discounts = [];
    for(let i=0;i<this.discounts.length;i++)
    {
      for(let j=0;j<data.sideData.discounts.length;j++)
      {
         if(this.discounts[i].value-10>=data.sideData.discounts[j]-10&&this.discounts[i].value-10<data.sideData.discounts[j])
         {
            discounts.push(this.discounts[i]);
            break;
         }
      }
    }
   
    let checked_discounts = discounts.map(data=>data.value);
    for(let i=0;i<checked_discounts.length;i++)
    {
      
      if(this.data.discount.indexOf(checked_discounts[i])>=0)
      discounts[i].checked = true ;
    }
    this.discounts = discounts;
    }
    else
    {
      alert("No Product Found")
    }
  }

  ngOnInit() 
  {
  
    let load = true;
    let firstTimeLoading = true;
    HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
    firstTimeLoading = false;
    load = false;
      this.subscribeRoute = this.route.params.subscribe(params => {
    
     
      try 
      {
        this.param = params['data']
        this.data = JSON.parse(this.security.decrypt(params['data']));
        console.log(this.data)
        for(let i=0;i<this.sortingArray.length;i++)
        {
         
          if(JSON.stringify(this.sortingArray[i].data) === JSON.stringify(this.data.sorting))
          this.sortBy = this.sortingArray[i];
        }
        
        // if(HomePageService.categories.length<=0)
        // {
        // this.subscibeCategories = this.homePageService.categories.subscribe(data=>
        // {
          
          
        //   let categories = data.filter(data => this.data.category.indexOf(data.parent)>=0)
         
        //   for(let i=0;i<categories.length;i++)
        //   {
        //    if(this.data.subCategory.indexOf(categories[i]._id)>=0)
        //    categories[i]['checked'] = true;
        //    else
        //    categories[i]['checked'] = false;
        //   }
          
        //   this.categories = categories ;
         
          
        // }
        // )
        // }
        // else
        // {
        //   let categories = HomePageService.categories.filter(data => data.parent==this.data.category[0])
          
        //    for(let i=0;i<categories.length;i++)
        //    {
        //     if(this.data.subCategory.indexOf(categories[i]._id)>=0)
        //     categories[i]['checked'] = true;
        //     else
        //     categories[i]['checked'] = false;
        //    }
           
        //    this.categories = categories ;
           

        // }
       
        this.productPageService.getProductsList(this.data).then(data =>
        {
          
          this.afterDataRecieved(data);
        })
      } 
      catch (error) {
        console.error(error)
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
ngOnDestroy()
{
  if(this.subscibeCategories)
  this.subscibeCategories.unsubscribe();
}
}
