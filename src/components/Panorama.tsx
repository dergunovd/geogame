import { FC, useEffect, useMemo } from "react";
import { ymaps } from "../ymaps";
import { useAppDispatch, useAppSelector } from "../store";
import { nextLevel } from "../actions";

export const Panorama: FC<{
  panorama?: ymaps.IPanorama;
}> = ({ panorama }) => {
  const { resultDistance, radius } = useAppSelector((state) => state.game);
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

  const resultText = useMemo(() => {
    if (radius !== undefined && resultDistance !== undefined) {
      const resultPercent = Number(
        ((radius - resultDistance * 2) / radius).toFixed(2)
      );

      if (resultPercent < 0.7) return "Попробуйте еще";
      if (resultPercent < 0.8) return "Почти";
      if (resultPercent < 0.9) return "Очень близко";
      if (resultPercent < 0.95) return "Отлично!";
      if (resultPercent < 0.99) return "Прекрасно!";
      return "Идеально!";
    }
    return undefined;
  }, [resultDistance, radius]);

  return (
    <div id="panorama" className="panorama">
      {!panorama && (
        <div className="panorama-backdrop">
          Чтобы начать выберите город из меню сверху
        </div>
      )}
      {resultDistance !== undefined && (
        <div className="panorama-backdrop">
          <>
            {resultText}
            <br />
            {resultDistance.toFixed(2)} км
            <br />
            <div
              className="panorama-backdrop-button"
              onClick={() => {
                dispatch(nextLevel());
              }}
            >
              Продолжить
            </div>
            <small>или выберите другой город</small>
          </>
        </div>
      )}
    </div>
  );
};
