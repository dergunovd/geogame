import { FC, useCallback, useEffect, useState } from "react";
import { FeatureCollection, Geometry } from "geojson";
// @ts-ignore
import * as turf from "@turf/turf";
import { ymaps } from "../ymaps";
import { getBbox } from "../utils/getBbox";
import { getRandomPointInBBox } from "../utils/getRandomPointInBBox";
import { cyclePolygon } from "../utils/cyclePolygon";
import { getCenterOfBbox } from "../utils/getCenterOfBbox";
import { Panorama } from "./Panorama";
import { YMaps } from "@pbe/react-yandex-maps";

const ListRegions: FC<{ map?: ymaps.Map }> = ({ map }) => {
  const [regions, setRegions] = useState<FeatureCollection>();
  const [startPoint, setStartPoint] = useState<[number, number]>();
  console.log(YMaps);
  useEffect(() => {
    ymaps.ready(() => {
      // @ts-ignore
      ymaps.borders.load("RU").then(setRegions, console.error);
    });
  }, []);

  const setPoint = useCallback(
    (polygon: Geometry) => {
      if (polygon.type !== "Polygon") {
        throw Error("Not a Polygon");
      }
      map?.geoObjects.removeAll();
      const bbox = getBbox(polygon);
      // map?.geoObjects.add(new ymaps.GeoObject({ geometry: polygon }));
      if (bbox) {
        const poly = turf.polygon(cyclePolygon(polygon).coordinates);
        while (true) {
          const point = getRandomPointInBBox(bbox);
          const turfPoint = turf.point(point);
          if (turf.booleanPointInPolygon(turfPoint, poly)) {
            const placemark = new ymaps.Placemark(turfPoint.geometry, {});
            setStartPoint(point);
            map?.geoObjects.add(placemark);
            const center = getCenterOfBbox(bbox);
            map?.setCenter([center[0], center[1]]);
            map?.events.add("click", (event) => {
              const coords = event.get("coords") as [number, number];
              const userPlacemark = new ymaps.Placemark(
                coords,
                {},
                { iconColor: "green" }
              );
              console.log(point, coords);
              const distance = turf.distance(
                point,
                // [point[1], point[0]],
                coords,
                //[coords[1], coords[0]],
                { units: "kilometers" }
              );
              console.log([point, coords]);
              const line = new ymaps.GeoObject(
                {
                  geometry: {
                    // Тип геометрии - "Ломаная линия".
                    type: "LineString",
                    // @ts-ignore
                    coordinates: [point, coords],
                  },
                  properties: {
                    hintContent: `${distance.toFixed(2)} км`,
                  },
                },
                { strokeWidth: 5, strokeColor: "#A378EE", hasHint: true }
              );
              console.log("asd");
              map?.geoObjects.add(line);
              console.log("asdf");
              map?.geoObjects.add(userPlacemark);
              console.log("asdfg");
            });
            break;
          }
        }
      }
    },
    [map]
  );

  return (
    <>
      <ul>
        {regions?.features?.map((value) => (
          <li key={value.properties?.iso3166}>
            <button
              onClick={() => {
                setPoint(value.geometry);
              }}
            >
              {JSON.stringify(value.properties?.name)}
            </button>
          </li>
        ))}
      </ul>
      <Panorama point={startPoint} />
    </>
  );
};

export default ListRegions;
