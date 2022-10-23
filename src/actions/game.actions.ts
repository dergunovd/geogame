import { Geometry } from "geojson";

export const enum GameActions {
  SET_CITY = "GAME/SET_CITY",
  SET_RESULT = "GAME/SET_RESULT",
  NEXT_LEVEL = "GAME/NEXT_LEVEL",
}

export const setCity = (city: Geometry) => ({
  type: GameActions.SET_CITY,
  city,
});

export const setResult = (result: number) => ({
  type: GameActions.SET_RESULT,
  result,
});

export const nextLevel = () => ({
  type: GameActions.NEXT_LEVEL,
});
