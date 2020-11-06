import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

export type DropdownOption = { text: string; value: any };

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() items: DropdownOption[];
  public selected: DropdownOption;
  private _value: any;
  public open = false;

  @Output()
  valueChange = new EventEmitter<any>();

  public get value() {
    return this._value;
  }

  @Input()
  public set value(value) {
    this.selected = this.items?.find((e) => e.value === value);
    this._value = value;
    this.valueChange.emit(this._value);
  }
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  clickOut(): void {
    this.open = false;
  }
}
