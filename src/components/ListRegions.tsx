import { FC, useCallback } from "react";
import { Feature, Geometry } from "geojson";
import msk from "../cities/msk.json";
import sbp from "../cities/spb.json";
import { useAppDispatch } from "../store";
import { setCity } from "../actions";

const ListRegions: FC = () => {
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(
    (city: Geometry) => {
      dispatch(setCity(city));
    },
    [dispatch]
  );

  return (
    <div className="regions">
      <div
        className="region"
        onClick={() => {
          clickHandler((msk as Feature).geometry);
        }}
      >
        {msk.properties.name}
      </div>
      <div
        className="region"
        onClick={() => {
          clickHandler((sbp as Feature).geometry);
        }}
      >
        {sbp.properties.name}
      </div>
    </div>
  );
};

export default ListRegions;
