/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faForward, faBackward,
} from '@fortawesome/free-solid-svg-icons';
import block from 'bem-css-modules';
import styles from './PlayerControls.module.scss';

const b = block(styles);

function PlayerControls({ setCurrentSongIndex, setIsPlaying }) {

  function handleSkip(e) {

    setCurrentSongIndex((current) => {
      return current
    })
  }
  return (
    <div className={b()}>
      <button className={b('skip')}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className={b('play')}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button className={b('skip')}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}

export default PlayerControls;
