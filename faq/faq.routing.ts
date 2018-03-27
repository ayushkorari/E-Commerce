import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqComponent } from './faq.component';

const routes: Routes = [
  { path: '', component: FaqComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);