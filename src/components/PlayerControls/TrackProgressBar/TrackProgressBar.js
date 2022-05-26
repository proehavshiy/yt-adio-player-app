/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './TrackProgressBar.module.scss';
// components
import ProgressBar from '../ProgressBar/ProgressBar';
// utils
import { setCurrentTrackTime } from '../../../store/actionCreators/actionCreator';
// styles
const cn = classNames.bind(styles);
const { trackProgressBar } = styles;

function TrackProgressBar({ setIsRewindTrack }) {
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

  return (
    <div className={cn(trackProgressBar)}>
      <ProgressBar
        SelectorPosition={barPosition}
        setSelectorPosition={setBarPosition}
        selectorSize='L'
        onBarAction={rewindTrack}
      />
    </div>
  );
}

export default TrackProgressBar;
