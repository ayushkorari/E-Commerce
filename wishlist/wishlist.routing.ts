import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistComponent } from './wishlist.component';

const routes: Routes = [
  { path: '', component: WishlistComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);