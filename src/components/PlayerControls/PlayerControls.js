/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faForward, faBackward,
} from '@fortawesome/free-solid-svg-icons';

function PlayerControls() {
  return (
    <div className="controls">
      <button className="controls__skip">
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className="controls__play">
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button className="controls__skip">
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}

export default PlayerControls;
