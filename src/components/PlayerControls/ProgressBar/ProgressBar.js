/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProgressBar.module.scss';
// utils
import getClickCoordsInsideArea from '../../../utils/getClickCoordsInsideArea';
// styles
const cn = classNames.bind(styles);
const { progressBar, switcher } = styles;

function TrackProgressBar({
  SelectorPosition = 0, setSelectorPosition, selectorSize = 'M', onBarAction,
}) {
  const progressBarRef = createRef(null);
  const selector = createRef(null);

  function updateBarControl(newLength) {
    // меняем положение переключателя на прогресс-баре
    setSelectorPosition(`${newLength * 100}%`);
    // перематываем трек
    onBarAction(newLength);
  }

  // клик по прогресс бару
  function handleBarClick(e) {
    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarRef.current);
    updateBarControl(clickInsideAreaX);

    if (e.currentTarget === e.target) {
      // для плавного движения переключателя только при клике на прогресс-бар
      selector.current.style = 'transition: all .1s linear;';
    }
  }

  // drag n drop
  function onMouseDown(e) {
    e.preventDefault();

    // убираем транзишн, чтобы отклик от драгндроп был четче
    selector.current.style.transition = 'none';

    const progressBarEl = progressBarRef.current;

    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
    updateBarControl(clickInsideAreaX);

    function onMouseMove(e) {
      const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
      updateBarControl(clickInsideAreaX);
    }

    function onMouseUp(e) {
      const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarEl);
      updateBarControl(clickInsideAreaX);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // mobile drag n drop touch API
  function onTouchStart() {
    // убираем транзишн, чтобы отклик от драгндроп был четче
    selector.current.style.transition = 'none';
  }

  function onTouchMove(e) {
    const { clickInsideAreaX } = getClickCoordsInsideArea(e, progressBarRef.current);
    updateBarControl(clickInsideAreaX);
  }

  return (
    <div className={cn(progressBar)}
      ref={progressBarRef}
      onClick={handleBarClick}>
      <span className={cn(switcher, `switcher${selectorSize}`)}
        ref={selector}
        style={{ left: SelectorPosition }}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      ></span>
    </div>
  );
}

export default TrackProgressBar;
