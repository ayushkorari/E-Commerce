import { Component, OnInit,Input } from '@angular/core';
import { Router }from '@angular/router';
import { SecurityService } from '../security.service'
@Component({
  selector: 'app-home-page-products',
  templateUrl: './home-page-products.component.html',
  styleUrls: ['./home-page-products.component.css']
})
export class HomePageProductsComponent implements OnInit {

  constructor(private router: Router,private securityService:SecurityService) 
  {
      this.security = securityService;
  }

  @Input() men: any[] = [];
  @Input() women: any[] = [];
  @Input() sort:any = {};
  private security:SecurityService;
  private sizeDiv:boolean = false; 
  
  goToProductDetailPage(id)
  {
    
    this.router.navigate(['product-detail',id.toString(),this.security.encrypt(id.toString())]);
  }
  ngOnInit() {
  }
 
}
