/* eslint-disable react/prop-types */
import React from 'react';
// player icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faForward, faBackward,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
// utils & custom hooks
import useMediaQuery from '../../customHooks/useMediaQuery';
import formatTime from '../../utils/formatTime';
// action creators
import {
  nextTrack, prevTrack, nextTrackInSequence,
  switchChangingTrackMode, switchLoopTrackMode,
  setVolume,
} from '../../store/actionCreators/actionCreator';
import styles from './PlayerControls.module.scss';
// components
import TrackProgressBar from './TrackProgressBar/TrackProgressBar';
import VolumeProgressBar from './VolumeProgressBar/VolumeProgressBar';
import { ReactComponent as VolumeIcon } from '../../img/volumeIcon.svg';
import { ReactComponent as LoopIcon } from '../../img/repeatIcon.svg';
import { ReactComponent as RandomIcon } from '../../img/randomModeIcon.svg';
// styles
const cn = classNames.bind(styles);
const {
  controls, sideControls, progressControls, mainControls,
  volumeBtn, loopBtn, orderBtn, skipBtn, playBtn,
  timer, timerLength, timerCurrent,
} = styles;

function PlayerControls({
  isPlaying, setIsPlaying, setIsRewindTrack,
}) {
  const isMobileScreen = useMediaQuery(768);
  const dispatch = useDispatch();
  const isRandomMode = useSelector((state) => state.mode.isRandomMode);
  const isLoopedTrack = useSelector((state) => state.mode.isLoopedTrack);

  const currentTrackTime = useSelector((state) => state.mode.currTrackData.currentTime);
  const trackDuration = useSelector((state) => state.mode.currTrackData.trackDuration);

  const currVolume = useSelector((state) => state.mode.volume.current);
  const prevVolume = useSelector((state) => state.mode.volume.prev);

  const toggleRandomMode = () => dispatch(switchChangingTrackMode(!isRandomMode));
  const toggleLoopMode = () => dispatch(switchLoopTrackMode(!isLoopedTrack));
  const skipToTheNextTrack = () => {
    dispatch(prevTrack(isRandomMode));
    dispatch(nextTrackInSequence());
  };
  const skipToThePrevTrack = () => {
    dispatch(nextTrack(isRandomMode));
    dispatch(nextTrackInSequence());
  };
  const playTrack = () => setIsPlaying(!isPlaying);
  const toggleVolume = () => {
    if (currVolume > 0) dispatch(setVolume(0, currVolume));
    if (currVolume === 0) dispatch(setVolume(prevVolume, 0));
  };

  return (
    <div className={cn(controls)}>
      <div className={cn(sideControls)}>
        <button className={cn(volumeBtn, { volumeBtnDisabled: currVolume === 0 })}
          onClick={toggleVolume}
        >
          <VolumeIcon />
        </button>
        {!isMobileScreen && <VolumeProgressBar />}
        <button className={cn(loopBtn, { activeBtn: isLoopedTrack })}
          onClick={toggleLoopMode}
        >
          <LoopIcon />
        </button>
        <button className={cn(orderBtn, { activeBtn: isRandomMode })}
          onClick={toggleRandomMode}
        >
          <RandomIcon />
        </button>
      </div>
      <div className={cn(progressControls)}>
        <div className={cn(timer, timerLength)}>{formatTime(currentTrackTime)}</div>
        <div className={cn(timer, timerCurrent)}>{formatTime(trackDuration)}</div>
        <TrackProgressBar
          setIsRewindTrack={setIsRewindTrack}
        />
      </div>
      <div className={cn(mainControls)}>
        <button className={cn(skipBtn)}
          onClick={skipToTheNextTrack}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className={cn(playBtn)}
          onClick={playTrack}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className={cn(skipBtn)}
          onClick={skipToThePrevTrack}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>

    </div >
  );
}

export default PlayerControls;
