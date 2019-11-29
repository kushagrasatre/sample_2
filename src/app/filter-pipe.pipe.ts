import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {
array_items=[];
  transform(items: any[], searchText: string): any[] {
    console.log(items);
    items.forEach(items=>{
      console.log(items);
      if(this.array_items.length<3){
      this.array_items.push(items.plan_id);
      }
    })
    if (!this.array_items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
     return items.filter(it => {
      return it.plan_id.includes(searchText);
     });
  }

}
