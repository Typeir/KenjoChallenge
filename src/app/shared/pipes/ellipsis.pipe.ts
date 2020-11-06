import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
	transform = ellipsis.bind(this);
}

export const ellipsis = (text: string, max = 20) => `${text.slice(0, max - 3)}...`;
