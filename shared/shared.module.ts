import { NgModule, ModuleWithProviders } from '@angular/core';
import { DiscountPipe } from '../disconunt.pipe';
import { NouisliderModule } from 'ng2-nouislider';
import { FooterComponent } from '../footer/footer.component';
import { BrandSearchPipe } from '../brand-search.pipe';
import { RouterModule } from '@angular/router';
import { SecurityService } from '../security.service';
import { ProductDetailService } from '../product-detail.service';
import { ProductPageService } from '../product-page.service';
import { UserService } from '../user.service';
import { ProductRoutePipe } from '../product-route.pipe';
import { FilterQuantityPipe } from '../filter-quantity.pipe';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../auth-guard.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { httpInterceptorProviders } from '../HttpInterceptors/interceptor'
 import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
 
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    RouterModule,
    NouisliderModule,
    ReactiveFormsModule,
    FormsModule,
	  MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule],
    
  declarations: [
    BrandSearchPipe ,DiscountPipe,FooterComponent,ProductRoutePipe,FilterQuantityPipe,SingleProductComponent
   
  ],
  exports: [ 
    HttpClientModule,
    HttpModule,
    SingleProductComponent,
    RouterModule,
    BrandSearchPipe ,
    NouisliderModule,
    FooterComponent,DiscountPipe,MatAutocompleteModule,ReactiveFormsModule,FormsModule,ProductRoutePipe,FilterQuantityPipe,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
   
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule],providers:[ httpInterceptorProviders , AuthGuardService,SecurityService,ProductDetailService,ProductPageService,UserService]
})
export class SharedModule {
 
}
