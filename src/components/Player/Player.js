/* eslint-disable max-len */
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

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function Player({
  currentSongIndex, setCurrentSongIndex, nextSongIndex, songs,
}) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopTrack, setIsLoopTrack] = useState(false);
  const [isNextTrackRandom, setIsNextTrackRandom] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [newCurrentTime, setNewCurrentTime] = useState(null);

  useEffect(() => {
    console.log('isNextTrackRandom:', isNextTrackRandom);
  }, [isNextTrackRandom]);
  useEffect(() => {
    console.log('isLoopTrack:', isLoopTrack);
  }, [isLoopTrack]);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current
        .play()
        .then()
        .catch((err) => console.log('playing err:', err));
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying, currentTime]);

  // upd time of an active track
  useEffect(() => {
    audioEl.current.currentTime = newCurrentTime;
  }, [newCurrentTime]);

  function getRandomNextSong(max, exclude) {
    const getRandom = () => Math.floor(Math.random() * max);
    const randomInt = getRandom();

    return exclude.indexOf(randomInt) === -1 ? randomInt : getRandomNextSong(max, exclude);
  }

  function skipSong(forwards = true) {
    // when next song
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        // random track mode
        switch (isNextTrackRandom) {
          case true:
            temp = getRandomNextSong(songs.length - 1, [currentSongIndex]);
            break;
          case false:
          default:
            temp += 1;
            if (temp > songs.length - 1) temp = 0;
        }
        return temp;
      });
      // when previous song
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        // random track mode
        switch (isNextTrackRandom) {
          case true:
            temp = getRandomNextSong(songs.length - 1, [currentSongIndex]);
            break;
          case false:
          default:
            temp -= 1;
            if (temp < 0) temp = songs.length - 1;
        }
        return temp;
      });
    }
  }

  function loopTrack() {
    if (isLoopTrack) {
      audioEl.current.currentTime = 0;
    } else {
      skipSong(true);
      audioEl.current.currentTime = 0;
    }
  }

  const currentSong = songs[currentSongIndex];
  const nextSong = isNextTrackRandom ? 'random mode' : `${songs[nextSongIndex].title} - ${songs[nextSongIndex].artist}`;

  return (
    <div className={b()}>
      <audio ref={audioEl} src={currentSong.src} preload="metadata"
        onTimeUpdate={(e) => {
          setCurrentTime(e.target.currentTime);
        }}
        onEnded={() => {
          // checking looping mode when track was ended
          loopTrack();
        }}
        onLoadedMetadata={(e) => {
          // get the duration of current track before rendering
          setTrackDuration(e.target.duration);
        }}
        onEmptied={() => {
          // это исправляет баг в сафари, когда он блокирует установку audio.currentTime = 0
          // до взаимодейтвия пользователя и позволяет не блокировать проигрывание после смены трека по кнопке
          audioEl.current.play();
        }}
      >
      </audio>
      <h4>Playing now</h4>
      <PlayerDetails
        song={currentSong}
      />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
        isLoopTrack={isLoopTrack}
        setIsLoopTrack={setIsLoopTrack}
        isNextTrackRandom={isNextTrackRandom}
        setIsNextTrackRandom={setIsNextTrackRandom}
        trackDuration={trackDuration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setNewCurrentTime={setNewCurrentTime}
      />
      <p><strong>Next up: </strong>{nextSong}</p>
    </div>
  );
}

export default Player;
