import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { AlbumActions } from '../actions';
import { AppState } from '../store';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(
    private albums: AlbumService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.albums.select().then((e) => {
      this.ngRedux.dispatch({ type: AlbumActions.SET_ALBUMS, value: e });
    });
  }
}
