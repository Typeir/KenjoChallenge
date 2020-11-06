import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ArtistActions } from '../actions';
import { AppState } from '../store';
import { Artist } from './artist';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  public artists: Artist[];
  private unsub: Unsubscribe;
  constructor(
    private artistService: ArtistService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.unsub = this.ngRedux.subscribe(() => {
      const { artists } = this.ngRedux.getState();
      this.artists = artists;
    });
    this.artistService.select().then((e) => {
      if (e) {
        this.ngRedux.dispatch({ type: ArtistActions.SET_ARTISTS, value: e });
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
