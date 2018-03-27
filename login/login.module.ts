import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './login.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule
    ],
    declarations:[LoginComponent],
    exports: []
  })
  export class LoginModule {
   
  }
  