import React, { useCallback, useEffect, useState } from "react";
import ListRegions from "./ListRegions";
import { Panorama } from "./Panorama";
import { Polygon } from "geojson";
import * as turf from "@turf/turf";
import { cyclePolygon } from "../utils/cyclePolygon";
import { getRandomPointInBBox } from "../utils/getRandomPointInBBox";
import { ymaps } from "../ymaps";
import { useAppDispatch, useAppSelector } from "../store";
import { setResult } from "../actions";

const Map = () => {
  const [targetCoords, setTargetCoords] = useState<[number, number]>();
  const [panorama, setPanorama] = useState<ymaps.IPanorama>();
  const { city, level, bbox } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [map, setMap] = useState<ymaps.Map>();

  useEffect(() => {
    ymaps.ready(() => {
      const map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["zoomControl"],
      });

      setMap(map);
    });
  }, []);

  useEffect(() => {
    const clickCallback = (event: ymaps.IEvent) => {
      const chooseCoords = event.get("coords") as [number, number];

      if (targetCoords) {
        const distance = turf.distance(
          [...targetCoords].reverse(),
          [...chooseCoords].reverse(),
          {
            units: "kilometers",
          }
        );
        dispatch(setResult(distance));

        const targetPlacemark = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            // @ts-expect-error types
            coordinates: targetCoords,
          },
        });

        const choosePlacemark = new ymaps.GeoObject(
          {
            geometry: {
              type: "Point",
              // @ts-expect-error types
              coordinates: chooseCoords,
            },
          },
          { iconColor: "green" }
        );

        const line = new ymaps.GeoObject(
          {
            geometry: {
              type: "LineString",
              // @ts-expect-error types
              coordinates: [targetCoords, chooseCoords],
            },
            properties: {
              hintContent: `${distance?.toFixed(2)} км`,
            },
          },
          { strokeWidth: 5, strokeColor: "#A378EE", hasHint: true }
        );

        map?.geoObjects.add(targetPlacemark);
        map?.geoObjects.add(choosePlacemark);
        map?.geoObjects.add(line);
        map?.events.remove("click", clickCallback as any);
      }
    };
    map?.events.add("click", clickCallback);

    return () => {
      map?.events.remove("click", clickCallback as any);
      map?.geoObjects.removeAll();
    };
  }, [dispatch, map, targetCoords]);

  const setPoint = useCallback(async () => {
    if (city && bbox) {
      map?.geoObjects.removeAll();
      map?.setBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
      const poly = turf.polygon(cyclePolygon(city as Polygon).coordinates);
      // Ищем подходящую панораму
      while (true) {
        // Выбираем рандомную точку
        const point = getRandomPointInBBox(bbox);
        const turfPoint = turf.point(point);
        if (turf.booleanPointInPolygon(turfPoint, poly)) {
          const panoramas = await ymaps?.panorama?.locate(point);
          if (panoramas.length) {
            const panorama = panoramas[0];
            setPanorama(panorama);
            setTargetCoords(
              panorama.getPosition().slice(0, 2) as [number, number]
            );

            break;
          }
        }
      }
    }
  }, [city, map, bbox]);

  useEffect(() => {
    setPoint();
  }, [setPoint, level]);

  return (
    <div className="content">
      <ListRegions />
      <div className="wrap">
        <Panorama panorama={panorama} />
        <div id="map" className="map" />
      </div>
    </div>
  );
};

export default Map;
