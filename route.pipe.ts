import { Pipe, PipeTransform } from '@angular/core';
import { SecurityService } from './security.service';
@Pipe({
  name: 'route'
})
export class RoutePipe implements PipeTransform {

  security:SecurityService;
  constructor(security:SecurityService)
  {
    this.security = security
  }
  search = JSON.stringify({
    "category":[1,2],
    "minPrice":0,
    "maxPrice":1000000,
    "gender":[],
    "brands":[],
    "discount":[],
    "sorting":{total_sold:-1},
    "colors" : [],
    "subCategory" : [],
    "skip": 0
    })
  transform(value: any, gender?: any, sort?: any, cat?:any): any {
    let search;
    if(value!='all')
    {
    search = {
      "category":[value._id||cat],
      "minPrice":0,
      "maxPrice":1000000,
      "gender":[gender||value.category_name.toLowerCase()],
      "brands":[],
      "discount":[],
      "sorting":sort||{total_sold:-1},
      "colors" : [],
      "subCategory" : [],
      "skip": 0
      }
    }
    if(value=='all')
    {
      search = {
        "category":[1,2],
        "minPrice":0,
        "maxPrice":1000000,
        "gender":[],
        "brands":[],
        "discount":[],
        "sorting":sort||{total_sold:-1},
        "colors" : [],
        "subCategory" : [],
        "skip": 0
        }
        
    }
    
    return ['/product-page',this.security.encrypt(JSON.stringify(search))];
  }

}
