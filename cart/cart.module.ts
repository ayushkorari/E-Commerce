import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './cart.routing';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[CartComponent],
    exports: []
  })
  export class CartModule {
   
  }
  