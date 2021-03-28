import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { Color } from '../models/color';

@Pipe({
  name: 'filterCars'
})
export class FilterCarsPipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
