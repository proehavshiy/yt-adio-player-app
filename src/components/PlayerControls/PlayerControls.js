/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faForward, faBackward,
} from '@fortawesome/free-solid-svg-icons';
// import block from 'bem-css-modules';
// import { ReactComponent as loopIcon } from '../../img/repeat.svg';
import classNames from 'classnames';
import styles from './PlayerControls.module.scss';

const cn = classNames;

const {
  controls, sideControls, progressControls, mainControls,
  progressBar,
  volumeBtn, loopBtn, orderBtn, skipBtn, playBtn,
  timer, timerLength, timerCurrent,
} = styles;

console.log('styles:', styles);

function PlayerControls({
  isPlaying, setIsPlaying, skipSong, isLoopTrack, setIsLoopTrack, trackDuration, currentTime, setNewCurrentTime,
}) {
  const progressBarRef = createRef(null);
  const lengthSwitcher = createRef(null);
  const [barPosition, setBarPosition] = useState(null);

  useEffect(() => {
    const currentDuration = `${currentTime / trackDuration * 100}%`;
    setBarPosition(currentDuration);
  }, [currentTime]);

  function rewindTrack(seed) {
    setNewCurrentTime(trackDuration * seed);
    setBarPosition(`${trackDuration * seed}%`);
  }

  function handleProgressBarClick(e) {
    const progressBarWidth = e.currentTarget.getBoundingClientRect().width;
    const progressBarLeftPos = e.currentTarget.getBoundingClientRect().left;
    const mouseCoordinateX = -(progressBarLeftPos - e.pageX); // координата клика мыши на прогресcбаре.
    // Тк она pageX считается от окна, а нам нужно от ширины прогрессбара,
    // то от левой позиции прогр - бара(она тоже от окна считается) отнимаем pageX и меняем знак на +
    const mouseCoordinateXpersents = mouseCoordinateX / progressBarWidth;

    if (e.currentTarget === e.target) {
      setBarPosition(`${mouseCoordinateXpersents * 100}%`);

      rewindTrack(mouseCoordinateXpersents);
    }
  }

  return (
    <div className={cn(controls)}>
      <div className={cn(sideControls)}>
        <button className={cn(volumeBtn)}>
          <svg width="100%" height="100%" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.4628 14.2166L5.84848 13.5734L5.67042 13.4666H5.4628V14.2166ZM5.4628 6.22185V6.97185H5.67042L5.84848 6.86508L5.4628 6.22185ZM12.1295 2.22446H12.8795C12.8795 1.95429 12.7342 1.705 12.4991 1.57186C12.264 1.43872 11.9755 1.44229 11.7438 1.58123L12.1295 2.22446ZM12.1295 18.214L11.7438 18.8573C11.9755 18.9962 12.264 18.9998 12.4991 18.8666C12.7342 18.7335 12.8795 18.4842 12.8795 18.214H12.1295ZM5.4628 13.4666H2.79613V14.9666H5.4628V13.4666ZM2.79613 13.4666C2.47339 13.4666 2.2128 13.2059 2.2128 12.8842H0.712795C0.712795 14.0362 1.64686 14.9666 2.79613 14.9666V13.4666ZM2.2128 12.8842V7.55431H0.712795V12.8842H2.2128ZM2.2128 7.55431C2.2128 7.23262 2.47339 6.97185 2.79613 6.97185V5.47185C1.64686 5.47185 0.712795 6.4023 0.712795 7.55431H2.2128ZM2.79613 6.97185H5.4628V5.47185H2.79613V6.97185ZM5.84848 6.86508L12.5151 2.86769L11.7438 1.58123L5.07711 5.57862L5.84848 6.86508ZM11.3795 2.22446V18.214H12.8795V2.22446H11.3795ZM12.5151 17.5708L5.84848 13.5734L5.07711 14.8599L11.7438 18.8573L12.5151 17.5708ZM14.0461 8.22446V12.2245H15.5461V8.22446H14.0461Z" fill="#8996B8" fill-opacity="0.6" />
          </svg>
        </button>
        <button className={cn(loopBtn)} onClick={() => setIsLoopTrack(!isLoopTrack)}>
          <svg width="100%" height="100%" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.02802 6.08709H14.3614V7.57875C14.3614 7.95375 14.8114 8.13709 15.0697 7.87042L17.3947 5.54542C17.5614 5.37875 17.5614 5.12042 17.3947 4.95375L15.0697 2.62875C15.0109 2.57117 14.9365 2.53226 14.8556 2.51693C14.7748 2.50161 14.6913 2.51055 14.6155 2.54263C14.5398 2.57471 14.4752 2.6285 14.43 2.69721C14.3847 2.76593 14.3609 2.84649 14.3614 2.92875V4.42042H5.19469C4.73636 4.42042 4.36136 4.79542 4.36136 5.25375V8.58709C4.36136 9.04542 4.73636 9.42042 5.19469 9.42042C5.65302 9.42042 6.02802 9.04542 6.02802 8.58709V6.08709ZM14.3614 14.4204H6.02802V12.9288C6.02802 12.5538 5.57802 12.3704 5.31969 12.6371L2.99469 14.9621C2.82802 15.1288 2.82802 15.3871 2.99469 15.5538L5.31969 17.8788C5.37844 17.9363 5.45291 17.9752 5.53374 17.9906C5.61456 18.0059 5.69811 17.997 5.77386 17.9649C5.84961 17.9328 5.91417 17.879 5.9594 17.8103C6.00463 17.7416 6.02851 17.661 6.02802 17.5788V16.0871H15.1947C15.653 16.0871 16.028 15.7121 16.028 15.2538V11.9204C16.028 11.4621 15.653 11.0871 15.1947 11.0871C14.7364 11.0871 14.3614 11.4621 14.3614 11.9204V14.4204Z" fill="#8996B8" fill-opacity="0.6" />
          </svg>
        </button>
        <button className={cn(orderBtn)}>
          <svg width="100%" height="100%" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1961 7.98279C15.1961 8.2038 15.2839 8.41577 15.4402 8.57205C15.5965 8.72833 15.8084 8.81612 16.0294 8.81612C16.2504 8.81612 16.4624 8.72833 16.6187 8.57205C16.775 8.41577 16.8628 8.2038 16.8628 7.98279V4.39112C16.8628 4.17011 16.775 3.95815 16.6187 3.80187C16.4624 3.64559 16.2504 3.55779 16.0294 3.55779H12.4461C12.2251 3.55779 12.0131 3.64559 11.8568 3.80187C11.7006 3.95815 11.6128 4.17011 11.6128 4.39112C11.6128 4.61214 11.7006 4.8241 11.8568 4.98038C12.0131 5.13666 12.2251 5.22446 12.4461 5.22446H14.0211L10.1961 9.04946L5.32943 4.19112C5.17001 4.0546 4.96495 3.98326 4.75522 3.99136C4.54549 3.99947 4.34654 4.08641 4.19813 4.23482C4.04971 4.38323 3.96277 4.58218 3.95467 4.79191C3.94657 5.00164 4.01791 5.20671 4.15443 5.36612L9.01276 10.2245L3.7711 15.4661C3.69299 15.5436 3.63099 15.6358 3.58869 15.7373C3.54638 15.8389 3.5246 15.9478 3.5246 16.0578C3.5246 16.1678 3.54638 16.2767 3.58869 16.3783C3.63099 16.4798 3.69299 16.572 3.7711 16.6495C3.84856 16.7276 3.94073 16.7896 4.04228 16.8319C4.14383 16.8742 4.25275 16.896 4.36276 16.896C4.47277 16.896 4.58169 16.8742 4.68324 16.8319C4.78479 16.7896 4.87696 16.7276 4.95443 16.6495L15.1961 6.40779V7.98279Z" fill="#8996B8" fill-opacity="0.6" />
            <path d="M16.0294 11.6245C15.8084 11.6245 15.5965 11.7123 15.4402 11.8685C15.2839 12.0248 15.1961 12.2368 15.1961 12.4578V14.0495L12.8794 11.7245C12.7225 11.5675 12.5097 11.4794 12.2878 11.4794C12.0658 11.4794 11.853 11.5675 11.6961 11.7245C11.5392 11.8814 11.451 12.0942 11.451 12.3161C11.451 12.538 11.5392 12.7509 11.6961 12.9078L14.0044 15.2245H12.4378C12.2167 15.2245 12.0048 15.3123 11.8485 15.4685C11.6922 15.6248 11.6044 15.8368 11.6044 16.0578C11.6044 16.2788 11.6922 16.4908 11.8485 16.647C12.0048 16.8033 12.2167 16.8911 12.4378 16.8911H16.0294C16.147 16.8918 16.2634 16.8677 16.371 16.8202C16.4786 16.7727 16.5749 16.703 16.6536 16.6156C16.7323 16.5282 16.7917 16.4252 16.8277 16.3132C16.8638 16.2013 16.8757 16.083 16.8628 15.9661V12.4578C16.8628 12.2368 16.775 12.0248 16.6187 11.8685C16.4624 11.7123 16.2504 11.6245 16.0294 11.6245Z" fill="#8996B8" fill-opacity="0.6" />
          </svg>
        </button>
      </div>
      <div className={cn(progressControls)}>
        <div className={cn(timer, timerLength)}>{currentTime}</div>
        <div className={cn(timer, timerCurrent)}>{trackDuration}</div>
        <div className={cn(progressBar)} ref={progressBarRef} onClick={handleProgressBarClick}>
          <span ref={lengthSwitcher} style={{ left: barPosition }}></span>
        </div>
      </div>
      <div className={cn(mainControls)}>
        <button className={cn(skipBtn)} onClick={() => skipSong(false)}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className={cn(playBtn)} onClick={() => setIsPlaying(!isPlaying)}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className={cn(skipBtn)} onClick={() => skipSong(true)}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>

    </div >
  );
}

export default PlayerControls;
