import { Reducer } from "redux";
import { BBox, Polygon } from "geojson";
import { GameActions } from "../actions";

interface GameStore {
  city?: Polygon;
  bbox?: BBox;
  radius?: number;
  resultDistance?: number;
  level: number;
}

const initialState: GameStore = {
  city: undefined,
  bbox: undefined,
  radius: undefined,
  resultDistance: undefined,
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
        bbox: action.bbox,
        radius: action.radius,
        level: 0,
        resultDistance: undefined,
      };
    case GameActions.SET_RESULT:
      return {
        ...state,
        resultDistance: action.resultDistance,
      };
    case GameActions.NEXT_LEVEL:
      return {
        ...state,
        level: state.level + 1,
        resultDistance: undefined,
      };
    default:
      return state;
  }
};
