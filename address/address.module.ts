import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './address.routing';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[AddressComponent],
    exports: []
  })
  export class AddressModule {
   
  }
  