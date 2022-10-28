import { BBox, Polygon } from "geojson";

export const enum GameActions {
  SET_CITY = "GAME/SET_CITY",
  SET_RESULT = "GAME/SET_RESULT",
  NEXT_LEVEL = "GAME/NEXT_LEVEL",
}

export const setCity = (city: Polygon, bbox: BBox, radius: number) => ({
  type: GameActions.SET_CITY,
  city,
  bbox,
  radius,
});

export const setResult = (resultDistance: number) => ({
  type: GameActions.SET_RESULT,
  resultDistance: resultDistance,
});

export const nextLevel = () => ({
  type: GameActions.NEXT_LEVEL,
});
