import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
class AlbumActions {
  static SET_ALBUMS = 'SET_ALBUMS';
  static SET_NULL_ALBUMS = 'SET_NULL_ALBUMS';

  setAlbums(data: any): AnyAction {
    return { type: AlbumActions.SET_ALBUMS, payload: data };
  }
  setNull(): AnyAction {
    return { type: AlbumActions.SET_NULL_ALBUMS };
  }
}

export default AlbumActions;
