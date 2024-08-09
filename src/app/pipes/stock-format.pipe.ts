import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockFormat'
})
export class StockFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null) return null;

    if (value == 0) return 'Nenhum item';
    if (value == 1) return `${value} item`;

    return `${value} itens`;
  }

}
