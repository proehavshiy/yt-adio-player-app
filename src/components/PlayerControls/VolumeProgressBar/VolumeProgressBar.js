/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './VolumeProgressBar.module.scss';
// components
import ProgressBar from '../ProgressBar/ProgressBar';
// utils
import { setVolume } from '../../../store/actionCreators/actionCreator';
// styles
const cn = classNames.bind(styles);
const { volumeProgressBar } = styles;

function VolumeProgressBar() {
  const [barPosition, setBarPosition] = useState(null);

  const dispatch = useDispatch();
  const currVolume = useSelector((state) => state.mode.volume.current);

  // обновление положения ползунка при изменении олзунка громкости
  useEffect(() => {
    setBarPosition(`${currVolume * 100}%`);
  }, [currVolume]);

  const updateVolume = (newVolume) => dispatch(setVolume(newVolume, currVolume));

  return (
    <div className={cn(volumeProgressBar)}>
      <ProgressBar
        SelectorPosition={barPosition}
        setSelectorPosition={setBarPosition}
        selectorSize='M'
        onBarAction={updateVolume}
      />
    </div>
  );
}

export default VolumeProgressBar;
