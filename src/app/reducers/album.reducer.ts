import { AnyAction, Reducer } from 'redux';
import { AlbumActions } from '../actions';

export const AlbumReducer: Reducer<any> = (
  lastState: Array<any> = null,
  action: AnyAction
): any => {
  switch (action.type) {
    case AlbumActions.SET_ALBUMS:
      return action.value;
  }
  return lastState;
};
