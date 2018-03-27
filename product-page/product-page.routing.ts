import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPageComponent } from './product-page.component';

const routes: Routes = [
  { path: '', component: ProductPageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);