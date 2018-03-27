import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './faq.routing';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[FaqComponent],
    exports: []
  })
  export class FaqModule {
   
  }
  