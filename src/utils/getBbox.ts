import { BBox, Geometry } from "geojson";

export const getBbox = (geometry: Geometry): BBox | null => {
  if (geometry.type !== "Polygon") {
    throw Error("getBbox allow only Polygon");
  }

  let bbox: BBox | null = null;

  geometry.coordinates.forEach((points) => {
    points.forEach(([lat, lon]) => {
      if (bbox === null) {
        bbox = [lat, lon, lat, lon];
      }
      if (lat < bbox[0]) {
        bbox[0] = lat;
      }
      if (lat > bbox[2]) {
        bbox[2] = lat;
      }
      if (lon < bbox[1]) {
        bbox[1] = lon;
      }
      if (lon > bbox[3]) {
        bbox[3] = lon;
      }
    });
  });

  return bbox;
};
