import { Reducer } from "redux";
import { Geometry } from "geojson";
import { GameActions } from "../actions";

interface GameStore {
  city?: Geometry;
  result?: number;
  level: number;
}

const initialState: GameStore = {
  city: undefined,
  result: undefined,
  level: 0,
};

export const gameReducer: Reducer<GameStore> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GameActions.SET_CITY:
      return {
        ...state,
        city: action.city,
        level: 0,
        result: undefined,
      };
    case GameActions.SET_RESULT:
      return {
        ...state,
        result: action.result,
      };
    case GameActions.NEXT_LEVEL:
      return {
        ...state,
        level: state.level + 1,
        result: undefined,
      };
    default:
      return state;
  }
};
