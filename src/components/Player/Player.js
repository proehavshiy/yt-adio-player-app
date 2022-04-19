/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import block from 'bem-css-modules';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './Player.module.scss';

const b = block(styles);

function Player({ song, nextSong }) {
  return (
    <div className={b()}>
      <audio src=""></audio>
      <h4>Playing now</h4>
      <PlayerDetails
        song={song}
      />
      <PlayerControls />
      <p><strong>Next up: </strong>{nextSong.title} by {nextSong.artist}</p>
    </div>
  );
}

export default Player;
