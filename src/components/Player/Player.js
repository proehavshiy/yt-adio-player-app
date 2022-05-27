/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
// components
import PlayerDetails from '../PlayerDetails/PlayerDetails';
import PlayerControls from '../PlayerControls/PlayerControls';
import styles from './Player.module.scss';
// action creators
import {
  nextTrack, nextTrackInSequence, setTrackDuration, setCurrentTrackTime,
} from '../../store/actionCreators/actionCreator';
// styles
const cn = classNames.bind(styles);
const { player } = styles;

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function Player() {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRewindTrack, setIsRewindTrack] = useState(null);

  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.data.tracks);
  const currIndex = useSelector((state) => state.data.currIndex);
  const nextIndex = useSelector((state) => state.data.nextIndexInSequence);
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
  // its a flag when we need to update current track time
  // in player without unnecesarily rerenders of a Player component
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

  const heading = isPlaying ? 'playing now' : 'turn sth on!';
  const currentSong = tracks[currIndex];
  const nextSong = changingModeState ? 'random mode' : `${tracks[nextIndex].title} - ${tracks[nextIndex].artist}`;

  return (
    <div className={cn(player)}>
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
          // до взаимодейтвия пользователя и позволяет не блокировать
          // проигрывание после смены трека по кнопке
          audioEl.current.play();
        }}
      >
      </audio>
      <h4>{heading}</h4>
      <PlayerDetails
        song={currentSong}
      />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setIsRewindTrack={setIsRewindTrack}
      />
      <p><strong>Next up: </strong>{nextSong}</p>
    </div>
  );
}

export default Player;
