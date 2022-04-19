/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import styles from './Player.module.scss';

function Player({ song, nextSong }) {
  return (
    <div className={styles.player}>
      <audio src=""></audio>
      <h4>Playing now</h4>
      <PlayerDetails
        song={song}
      />
      {/* CONTROLS */}
      <p><strong>Next up:</strong>{nextSong.title} by {nextSong.artist}</p>
    </div>
  );
}

export default Player;
