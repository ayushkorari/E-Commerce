import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { MainHeaderComponent } from './main-header/main-header.component';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule }        from './app-routing.module';
import { HomePageProductsComponent } from './home-page-products/home-page-products.component';
import { CategoryPipe } from './category.pipe';
import { HomePageService } from './home-page.service'
import { NgxCarouselModule } from 'ngx-carousel';
import { RoutePipe } from './route.pipe';






@NgModule({
  declarations: [
	
    AppComponent,
	
    MainHeaderComponent,
	
    SecondaryHeaderComponent,
	
    PageNotFoundComponent,
	
    HomeComponent,
	
    HomePageProductsComponent,
	
    CategoryPipe,
	
    RoutePipe
	
   
 
  ],
  imports: [
    NgxCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,SharedModule
  ],
  exports: [
   
  ],
  providers: [HomePageService],
  bootstrap: [AppComponent]
})
export class AppModule { }