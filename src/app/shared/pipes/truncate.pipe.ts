import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, lengthLimit: number, trailingSymbol: string) {
    return value.length > lengthLimit ? value.substring(0, lengthLimit) + trailingSymbol : value;
  }

}
