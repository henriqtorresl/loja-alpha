import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brlCurrency'
})
export class BrlCurrencyPipe implements PipeTransform {

  transform(value: number | string, currencySymbol: string = 'R$', digitsInfo: string = '1.2-2'): string | null {
    if (value == null) return null;

    // Converte o valor para número
    const numberValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

    // Formata o número com vírgula como separador decimal e ponto como separador de milhar
    const formattedValue = numberValue.toFixed(2)
      .replace('.', ',') // Substitui o ponto decimal por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separadores de milhar

    return `${currencySymbol} ${formattedValue}`;
  }
}
