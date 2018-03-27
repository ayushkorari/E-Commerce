import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
  { path: '', component: ProductDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);