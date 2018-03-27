import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './wishlist.routing';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[WishlistComponent],
    exports: []
  })
  export class WishlistModule {
   
  }
  