/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
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
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  // timer
  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setCurrentTime(Number.parseInt(audioEl.current.currentTime, 10));
        console.log('currentTime:', currentTime);
      }, 1000);
    }
  });

  function skipSong(forwards = true) {
    // when next song
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp += 1;
        if (temp > songs.length - 1) temp = 0;
        return temp;
      });
      // when previous song
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp -= 1;
        if (temp < 0) temp = songs.length - 1;
        return temp;
      });
    }
  }

  const currentSong = songs[currentSongIndex];
  const nextSong = songs[nextSongIndex];

  return (
    <div className={b()}>
      <audio src={currentSong.src} ref={audioEl}></audio>
      <h4>Playing now</h4>
      <PlayerDetails
        song={currentSong}
      />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
      />
      <p><strong>Next up: </strong>{nextSong.title} by {nextSong.artist}</p>
    </div>
  );
}

export default Player;
