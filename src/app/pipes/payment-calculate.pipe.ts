import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentCalculate'
})
export class PaymentCalculatePipe implements PipeTransform {

  transform(value: number, rentDate: string,returnDate:string): number {
    var rentDate1 = new Date(rentDate);
    var returnDate1 = new Date(returnDate);
    var diff = returnDate1.getTime()-rentDate1.getTime();
    var numberOfDays = Math.ceil(diff / (1000 * 3600 * 24));

    return numberOfDays*value
  }

}
