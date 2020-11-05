import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
class ArtistActions {
  static SET_ARTISTS = 'SET_ARTISTS';
  static SET_NULL_ARTISTS = 'SET_NULL_ARTISTS';

  setArtists(data: any): AnyAction {
    return { type: ArtistActions.SET_ARTISTS, payload: data };
  }
  setNull(): AnyAction {
    return { type: ArtistActions.SET_NULL_ARTISTS };
  }
}

export default ArtistActions;
