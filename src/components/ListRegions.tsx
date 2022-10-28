import { FC, useCallback } from "react";
import { Polygon } from "geojson";
import msk from "../cities/msk.json";
import sbp from "../cities/spb.json";
import sar from "../cities/sar.json";
import { useAppDispatch } from "../store";
import { setCity } from "../actions";
import * as turf from "@turf/turf";
import { getBbox } from "../utils/getBbox";

const ListRegions: FC = () => {
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(
    (city: Polygon) => {
      const bbox = getBbox(city);
      if (!bbox) {
        throw Error("Can not get bbox");
      }
      const radius = turf.distance([bbox[0], bbox[1]], [bbox[2], bbox[3]], {
        units: "kilometers",
      });
      dispatch(setCity(city, bbox, radius));
    },
    [dispatch]
  );

  return (
    <div className="regions">
      <div
        className="region"
        onClick={() => {
          clickHandler(msk.geometry as Polygon);
        }}
      >
        {msk.properties.name}
      </div>
      <div
        className="region"
        onClick={() => {
          clickHandler(sbp.geometry as Polygon);
        }}
      >
        {sbp.properties.name}
      </div>
      <div
        className="region"
        onClick={() => {
          clickHandler(sar.geometry as Polygon);
        }}
      >
        {sar.properties.name}
      </div>
    </div>
  );
};

export default ListRegions;
