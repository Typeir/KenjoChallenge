import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Album } from '../../album';
import { AlbumService } from '../../album.service';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss'],
})
export class AlbumItemComponent implements OnInit {
  @Input() public album: Album;
  @Input() public index?: number;

  constructor(
    private albums: AlbumService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {}

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
