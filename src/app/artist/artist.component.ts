import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ArtistActions } from '../actions';
import { AppState } from '../store';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  constructor(
    private artists: ArtistService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {
    this.artists.select().then((e) => {
      this.ngRedux.dispatch({ type: ArtistActions.SET_ARTISTS, value: e });
    });
  }
}
