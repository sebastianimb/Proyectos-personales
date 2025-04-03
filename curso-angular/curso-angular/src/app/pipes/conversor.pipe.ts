import { Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'conversor',standalone:false})
export class ConversorPipe implements PipeTransform{
  transform(value: string, por: string) {
    let valueOne = parseInt(value)
    let valueTwo = parseInt(por)
    return `La multiplicación de ${valueOne} x ${valueTwo} es: ${valueOne*valueTwo}`
  }
}
