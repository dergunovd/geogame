import { Polygon } from "geojson";

export const cyclePolygon = (polygon: Polygon) => ({
  ...polygon,
  coordinates: polygon.coordinates.map((points) => [...points, points[0]]),
});
