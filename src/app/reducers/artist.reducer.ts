import { AnyAction, Reducer } from 'redux';
import { ArtistActions } from '../actions';

export const ArtistReducer: Reducer<any> = (
  lastState: Array<any> = null,
  action: AnyAction
): any => {
  switch (action.type) {
    case ArtistActions.SET_ARTISTS:
      return action.value;
  }
  return lastState;
};
