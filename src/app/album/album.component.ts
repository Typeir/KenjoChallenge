import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { AlbumActions } from '../actions';
import { AppState } from '../store';
import { Album } from './album';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public albums: Album[];
  private unsub: Unsubscribe;
  constructor(
    private albumService: AlbumService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.unsub = this.ngRedux.subscribe(() => {
      const { albums } = this.ngRedux.getState();
      this.albums = albums;
    });
    this.albumService.select().then((e) => {
      if (e) {
        this.ngRedux.dispatch({ type: AlbumActions.SET_ALBUMS, value: e });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
