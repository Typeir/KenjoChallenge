import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @select(['router'])
  readonly router$: Observable<any>;

  constructor() {}

  ngOnInit(): void {}
}
