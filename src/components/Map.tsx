import React from "react";
import ListRegions from "./ListRegions";
import { Map as YMap, YMaps } from "@pbe/react-yandex-maps";

const Map = () => (
  <YMaps
    query={{
      apikey: process.env.REACT_APP_YMAP_API_KEY,
      mode: "debug",
    }}
  >
    <ListRegions />
    <YMap
      height={400}
      width={600}
      state={{
        center: [55.76, 37.64],
        zoom: 7,
      }}
    />
  </YMaps>
);

export default Map;
