import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './product-detail.routing';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[ProductDetailComponent],
    exports: []
  })
  export class ProductDetailModule {
   
  }
  