/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { createRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ProgressBar.module.scss';

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
    const currentDuration = `${currentTrackTime / trackDuration * 100}%`;
    setBarPosition(currentDuration);
  }, [currentTrackTime]);

  // перемотка трека
  function rewindTrack(seed) {
    dispatch(setCurrentTrackTime(trackDuration * seed));
    setIsRewindTrack(trackDuration * seed); // its a flag when we need to update current track time in player without unnecesarily rerenders of a Player component
  }

  // клик по прогресс бару
  function handleProgressBarClick(e) {
    const barEl = progressBarRef.current;
    const switcherEl = lengthSwitcher.current;

    const coords = barEl.getBoundingClientRect();

    const barElWidth = coords.width;
    const barElLeft = coords.left;
    const mouseX = e.clientX;

    // координата клика мыши на прогресcбаре.
    const barClickX = (mouseX - barElLeft) / barElWidth;

    if (e.currentTarget === e.target) {
      // для плавного движения переключателя только по клику на прогресс бар
      switcherEl.style = 'transition: all .1s linear;';

      // меняем положение ползунка
      setBarPosition(`${barClickX * 100}%`);
      // перематываем трек
      rewindTrack(barClickX);
    }
  }

  // drag n drop

  function onMouseDown(e) {
    e.preventDefault();

    const switcherEl = lengthSwitcher.current;
    switcherEl.style = 'transition: none;';

    const barEl = progressBarRef.current;

    const coords = barEl.getBoundingClientRect();
    const barElWidth = coords.width;
    const barElLeft = coords.left;
    const mouseX = e.clientX;
    const mouseBarPosX = (mouseX - barElLeft) / barElWidth;

    setBarPosition(`${mouseBarPosX * 100}%`);

    function onMouseMove(e) {
      const mouseX = e.clientX;
      let mouseBarPosX = (mouseX - barElLeft) / barElWidth;

      // чтобы ползунок не выходил за границы прогресс бара
      if (mouseBarPosX > 1) {
        mouseBarPosX = 1;
      }
      if (mouseBarPosX < 0) {
        mouseBarPosX = 0;
      }

      setBarPosition(`${mouseBarPosX * 100}%`);
      rewindTrack(mouseBarPosX);
    }

    function onMouseUp(e) {
      const mouseX = e.clientX;
      const mouseBarPosX = (mouseX - barElLeft) / barElWidth;
      setBarPosition(`${mouseBarPosX * 100}%`);
      rewindTrack(mouseBarPosX);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  return (
    <div className={cn(progressBar)}
      ref={progressBarRef}
      onClick={handleProgressBarClick}>
      <span
        ref={lengthSwitcher}
        style={{ left: barPosition }}
        onMouseDown={onMouseDown}
        onDragStart={() => false}
      ></span>
    </div>
  );
}

export default ProgressBar;
