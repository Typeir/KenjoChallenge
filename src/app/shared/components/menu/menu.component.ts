import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ellipsis } from '../../pipes/ellipsis.pipe';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent implements OnInit, OnDestroy {
	@select([ 'router' ])
	readonly router$: Observable<string>;
	private sub: Subscription;
	public route: string;
	constructor() {}

	ngOnInit(): void {
		this.sub = this.router$.subscribe((route: string) => {
			this.route = ellipsis(route);
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
