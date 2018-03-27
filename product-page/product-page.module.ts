import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './product-page.routing';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[ProductPageComponent],
    exports: []
  })
  export class ProductPageModule {
   
  }
  