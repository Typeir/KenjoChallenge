import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { AlbumEntity } from '../album/album';
import { ArtistEntity } from '../artist/artist';
import { AlbumReducer } from '../reducers/album.reducer';
import { ArtistReducer } from '../reducers/artist.reducer';

export type AppState = {
  albums: AlbumEntity[];
  artists: ArtistEntity[];
  router: any;
};

export const rootReducer = combineReducers<AppState>({
  albums: AlbumReducer,
  artists: ArtistReducer,
  router: routerReducer,
});

export const INITIAL_STATE = {
  albums: [],
  artists: [],
  router: '',
};
