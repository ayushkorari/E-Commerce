import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../home-page.service';
import { NgxCarousel } from 'ngx-carousel';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeService:HomePageService;
  topOffersProducts:any = {men:[],women:[]};
  popularProducts:any = {men:[],women:[]};
  latestProducts:any = {men:[],women:[]};
  constructor(home:HomePageService) {
    this.homeService = home;
   }
   public imageSources: string[] = [
    'http://localhost:3000/la.jpg',
    'http://localhost:3000/chicago.jpg',
    'http://localhost:3000/ny.jpg'
 ];
 
 carouselOne = {
  grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
  slide: 1,
  speed: 400,
  interval: 4000,
  point: {
    visible: true
  },
  load: 2,
  touch: true,
  loop: true,
  custom: 'banner'
}
goTo(location: string): void {
  window.location.hash = location;
}

myfunc(event: Event)
{
 
}
  
  ngOnInit()
  {
  let load = true;
  let firstTimeLoading = true;
  HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
    firstTimeLoading = false;
    load = false;
      this.homeService.getTopOffersProducts().then(topOfferProducts =>
    {
      
        this.topOffersProducts = topOfferProducts ;
    }
    )
    this.homeService.getPopularProducts().then(popularProducts =>
      {
          this.popularProducts = popularProducts ;
      }
      )
      this.homeService.getLatestProducts().then(latestProducts =>
        {
            this.latestProducts = latestProducts ;
        }
        )
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
