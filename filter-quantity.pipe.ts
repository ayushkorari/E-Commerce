import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterQuantity',
  pure: false
  
})
export class FilterQuantityPipe implements PipeTransform {

  transform(value: any[], args?: any[],size?:any): any {
    let quantity = 10;
    for(let i=0;i<args.length;i++)
    {
      if(args[i].size == size)
      {
        quantity = args[i].quantity;
        break;
      }
    }
    return value.filter(quant =>quant<=quantity).length>0?value.filter(quant =>quant<=quantity):['Not Available'];
  }

}
