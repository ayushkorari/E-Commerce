import { Pipe, PipeTransform } from '@angular/core';
import { SecurityService } from './security.service';
@Pipe({
  name: 'productRoute'
})
export class ProductRoutePipe implements PipeTransform {

  security:SecurityService;
  constructor(security:SecurityService)
  {
    this.security = security
  }
  transform(value: any, args?: any): any {
    return ['/product-detail',(value.id||value._id).toString(),this.security.encrypt((value.id||value._id).toString())];
  }

}
