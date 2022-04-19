/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import block from 'bem-css-modules';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './Player.module.scss';

const b = block(styles);

function Player({
  currentSongIndex, setCurrentSongIndex, nextSongIndex, songs,
}) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });
  return (
    <div className={b()}>
      <audio ref={audioEl}></audio>
      <h4>Playing now</h4>
      <PlayerDetails
        song={songs[currentSongIndex]}
      />
      <PlayerControls
        setCurrentSongIndex={setCurrentSongIndex}
        setIsPlaying={setIsPlaying}
      />
      <p><strong>Next up: </strong>{songs[nextSongIndex].title} by {songs[nextSongIndex].artist}</p>
    </div>
  );
}

export default Player;
