/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, useRef, useMemo, useCallback,
} from 'react';
import block from 'bem-css-modules';
import { connect, useSelector, useDispatch } from 'react-redux';
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './Player.module.scss';

import {
  nextTrack, nextTrackInSequence, setTrackDuration, setCurrentTrackTime,
} from '../../store/actionCreators/actionCreator';

const b = block(styles);

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function Player({
  songs, tracks, currIndex, nextIndex, randomMode,
}) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRewindTrack, setIsRewindTrack] = useState(null);

  const dispatch = useDispatch();
  const currentTrackTime = useSelector((state) => state.mode.currTrackData.currentTime);

  const changingModeState = useSelector((state) => state.mode.isRandomMode);
  const isLoopedTrack = useSelector((state) => state.mode.isLoopedTrack);

  const currVolume = useSelector((state) => state.mode.volume.current);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current
        .play()
        .then()
        .catch((err) => console.log('playing err:', err));
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying, currentTrackTime]);

  useEffect(() => {
    audioEl.current.volume = currVolume;
  }, [currVolume]);

  // upd time of an active track
  // we use here isRewindTrack as a dependance
  // its a flag when we need to update current track time in player without unnecesarily rerenders of a Player component
  useEffect(() => {
    audioEl.current.currentTime = currentTrackTime;
  }, [isRewindTrack]);

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
          dispatch(setCurrentTrackTime(e.target.currentTime));
        }}
        onEnded={() => {
          // checking looping mode when track was ended
          loopTrack();
        }}
        onLoadedMetadata={(e) => {
          // get the duration of current track before rendering
          dispatch(setTrackDuration(e.target.duration));
          // set volume equal to state value
          audioEl.current.volume = currVolume;
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
        setIsRewindTrack={setIsRewindTrack}
      // setVolume={volume}
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
