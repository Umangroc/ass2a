import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(records: any[], searchText: string): any[] {
    if (!records) return [];
    // console.log("Initial Search",searchText);
    if (!searchText || searchText == "No Search") return records;
    return records.filter(response => {
      // console.log(response);
      return (response.itemName.toLowerCase().includes(searchText.toLowerCase())||response.itemCategory.toLowerCase().includes(searchText.toLowerCase()));
    });
  }

}
