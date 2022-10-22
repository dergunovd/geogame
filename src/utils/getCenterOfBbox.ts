import { BBox } from "geojson";

export const getCenterOfBbox = (bbox: BBox): [number, number] => [
  (bbox[0] + bbox[2]) / 2,
  (bbox[1] + bbox[3]) / 2,
];
