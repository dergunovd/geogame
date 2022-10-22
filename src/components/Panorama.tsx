import { FC, useEffect, useState } from "react";
import { ymaps } from "../ymaps";

export const Panorama: FC<{ point?: [number, number] }> = ({ point }) => {
  useEffect(() => {
    let player: ymaps.panorama.Player;
    if (!point) {
      return;
    }

    ymaps?.panorama?.locate(point).then((panoramas) => {
      if (panoramas.length > 0) {
        const panorama = panoramas[0];
        Object.defineProperty(panorama, "getMarkers", {
          value: () => [],
        });
        player = new ymaps.panorama.Player("panorama", panorama, {
          direction: [0, 0],
          controls: [],
        });
      }
    }, console.error);

    return () => player?.destroy();
  }, [point]);

  return <div id="panorama" style={{ width: 600, height: 400 }} />;
};
