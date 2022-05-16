/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './App.module.scss';
import Player from './components/Player/Player';

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function App({ tracks }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > tracks.length - 1) return 0;
      return currentSongIndex + 1;
    });
  }, [currentSongIndex]);

  return (
    <div className={styles.container}>
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={tracks}
      />
    </div >
  );
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(App);
