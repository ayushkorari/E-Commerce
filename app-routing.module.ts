import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
// import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomePageService } from './home-page.service';
import { SingleProductComponent } from './single-product/single-product.component';
import { AuthGuardService } from './auth-guard.service';
const appRoutes: Routes = [
  // {
  //   path: 'main-header',
  //   component: MainHeaderComponent,
  //   outlet: 'header'
  //   ,
  //   resolve: {
  //     categories: HomePageService
  //   }
  // },
  // {
  //   path: '',
  //   component: MainHeaderComponent,
  //   // outlet: 'header',
  //   // resolve: {
  //   //   categories: HomePageService
  //   // }
  // },
  // {
  //   path: 'sec-header',
  //   component: SecondaryHeaderComponent,
  //   outlet: 'header'
  // },
  { path:'home' , component : HomeComponent } ,
  { path: 'product-detail/:id/:data', loadChildren: './product-detail/product-detail.module#ProductDetailModule' },
  { path: 'product-page/:data', loadChildren: './product-page/product-page.module#ProductPageModule' },
  { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule'},
  { path: 'address', loadChildren: './address/address.module#AddressModule',
  canLoad: [AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginModule',canActivate: [AuthGuardService] },
  { path: 'faq', loadChildren: './faq/faq.module#FaqModule' },
  { path: '',   redirectTo : '/home', pathMatch: 'full' },
  { path: '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
