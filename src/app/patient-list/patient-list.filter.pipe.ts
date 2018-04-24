import {Pipe, PipeTransform} from '@angular/core';
import {Patient} from '../patient/patient';


@Pipe({
  name: 'filter'
})
export class PatinetListFilterPipe implements PipeTransform {
  transform(items: Patient[], searchText: string): Patient[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return (it.name + ' ' + it.surname).toLowerCase().includes(searchText);
    });
  }

}
