import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(AllProducts: any,searchValue:string): any[] {
    return AllProducts.filter((el:any)=>{
      return el.title.toLowerCase().includes(searchValue.toLowerCase())
    });
  }

}
