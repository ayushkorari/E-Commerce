import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any[], filterBy?: any): any
   {
        
        return  value.filter(
          (cat:any)=>cat.parent==filterBy);
   }
    

}
