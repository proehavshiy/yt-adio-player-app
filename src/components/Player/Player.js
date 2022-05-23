/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import block from 'bem-css-modules';
import { connect, useSelector, useDispatch } from 'react-redux';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './Player.module.scss';

import { nextTrack, nextTrackInSequence } from '../../store/actionCreators/actionCreator';

const b = block(styles);

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function Player({
  songs, tracks, currIndex, nextIndex, randomMode,
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

  const dispatch = useDispatch();

  const changingModeState = useSelector((state) => state.mode.isRandomMode);
  const isLoopedTrack = useSelector((state) => state.mode.isLoopedTrack);

  function loopTrack() {
    if (isLoopedTrack) {
      audioEl.current.currentTime = 0;
    } else {
      dispatch(nextTrack(changingModeState));
      dispatch(nextTrackInSequence());
    }
  }

  const currentSong = tracks[currIndex];
  const nextSong = randomMode ? 'random mode' : `${tracks[nextIndex].title} - ${tracks[nextIndex].artist}`;

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
        // skipSong={skipSong}
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

function mapStateToProps(state) {
  return {
    currIndex: state.data.currIndex,
    tracks: state.data.tracks,
    nextIndex: state.data.nextIndexInSequence,
    randomMode: state.mode.isRandomMode,
  };
}

export default connect(mapStateToProps)(Player);
