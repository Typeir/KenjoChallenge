import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(text: string, max = 20): string {
    return `${text.slice(0, max - 3)}...`;
  }
}
