import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressComponent } from './address.component';

const routes: Routes = [
  { path: '', component: AddressComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);