import { BBox } from "geojson";

export const getRandomPointInBBox = (bbox: BBox): [number, number] => {
  const [yMin, xMin, yMax, xMax] = bbox;
  const lat = yMin + Math.random() * (yMax - yMin);
  const lng = xMin + Math.random() * (xMax - xMin);
  return [lat, lng];
};
