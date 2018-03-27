import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {

  transform(value: any[], filterBy?: any): any {

    console.log(filterBy)
    filterBy = (filterBy) ? filterBy.toLocaleLowerCase():null ;
    return (filterBy)? value.filter(
      (data:any)=>(data.brand_name||data.color_name||data.category_name).toLocaleLowerCase().indexOf(filterBy)!==-1):value;
  }

}
