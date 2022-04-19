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

function PlayerControls({ isPlaying, setIsPlaying, skipSong }) {
  return (
    <div className={b()}>
      <button className={b('skip')} onClick={() => skipSong(false)}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className={b('play')} onClick={() => setIsPlaying(!isPlaying)}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button className={b('skip')} onClick={() => skipSong(true)}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}

export default PlayerControls;
