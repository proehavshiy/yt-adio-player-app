/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { createRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ProgressBar.module.scss';
import getClickCoordsInsideArea from '../../../utils/getClickCoordsInsideArea';

import { setCurrentTrackTime } from '../../../store/actionCreators/actionCreator';

const cn = classNames.bind(styles);

const { progressBar } = styles;

function ProgressBar({ setIsRewindTrack }) {
  const progressBarRef = createRef(null);
  const lengthSwitcher = createRef(null);
  const [barPosition, setBarPosition] = useState(null);

  const dispatch = useDispatch();
  const trackDuration = useSelector((state) => state.mode.currTrackData.trackDuration);
  const currentTrackTime = useSelector((state) => state.mode.currTrackData.currentTime);

  // обновление положения ползунка при проигрывании
  useEffect(() => {
    const currentDuration = `${(currentTrackTime / trackDuration) * 100}%`;
    setBarPosition(currentDuration);
  }, [currentTrackTime]);

  // перемотка трека
  function rewindTrack(seed) {
    dispatch(setCurrentTrackTime(trackDuration * seed));
    // its a flag when we need to update current track time in player
    // without unnecesarily rerenders of a Player component
    setIsRewindTrack(trackDuration * seed);
  }

  function updateBarControls(newLength) {
    // меняем положение переключателя на прогресс-баре
    setBarPosition(`${newLength * 100}%`);
    // перематываем трек
    rewindTrack(newLength);
  }

  // клик по прогресс бару
  function handleBarClick(e) {
    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarRef.current);
    updateBarControls(clickInsideAreaX);

    if (e.currentTarget === e.target) {
      // для плавного движения переключателя только при клике на прогресс-бар
      lengthSwitcher.current.style = 'transition: all .1s linear;';
    }
  }

  // drag n drop

  function onMouseDown(e) {
    e.preventDefault();

    // убираем транзишн, чтобы отклик от драгндроп был четче
    lengthSwitcher.current.style.transition = 'none';

    const progressBarEl = progressBarRef.current;

    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
    updateBarControls(clickInsideAreaX);

    function onMouseMove(e) {
      const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
      updateBarControls(clickInsideAreaX);
    }

    function onMouseUp(e) {
      const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
      updateBarControls(clickInsideAreaX);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // mobile drag n drop touch API

  function onTouchStart() {
    // убираем транзишн, чтобы отклик от драгндроп был четче
    lengthSwitcher.current.style.transition = 'none';
  }

  function onTouchMove(e) {
    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarRef.current);
    updateBarControls(clickInsideAreaX);
  }

  return (
    <div className={cn(progressBar)}
      ref={progressBarRef}
      onClick={handleBarClick}>
      <span
        ref={lengthSwitcher}
        style={{ left: barPosition }}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      ></span>
    </div>
  );
}

export default ProgressBar;
