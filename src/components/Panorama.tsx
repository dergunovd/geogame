import { FC, useEffect } from "react";
import { ymaps } from "../ymaps";
import { useAppDispatch, useAppSelector } from "../store";
import { nextLevel } from "../actions";

export const Panorama: FC<{
  panorama?: ymaps.IPanorama;
}> = ({ panorama }) => {
  const { result } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let player: ymaps.panorama.Player;
    if (panorama) {
      Object.defineProperty(Object.getPrototypeOf(panorama), "getMarkers", {
        value: () => [],
      });

      player = new ymaps.panorama.Player("panorama", panorama, {
        direction: [0, 0],
        controls: [],
        suppressMapOpenBlock: true,
      });
    }

    return () => player?.destroy();
  }, [panorama]);

  return (
    <div id="panorama" className="panorama">
      {!panorama && (
        <div className="panorama-backdrop">
          Чтобы начать выберите город из меню сверху
        </div>
      )}
      {result !== undefined && (
        <div className="panorama-backdrop">
          Вы были близки на {result.toFixed(2)} км
          <br />
          Вы можете
          <div
            className="panorama-backdrop-button"
            onClick={() => {
              dispatch(nextLevel());
            }}
          >
            Продолжить
          </div>
          или выберете новый город
        </div>
      )}
    </div>
  );
};
