/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import styles from './App.module.scss';
import Player from './components/Player/Player';

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function App() {
  // eslint-disable-next-line no-unused-vars
  const [songs] = useState([
    {
      title: 'Order',
      artist: 'ComaStudio',
      img_src: './img/pexels-alexander-kozlov-11784237.jpg',
      src: './music/ComaStudio-Order.mp3',
    },
    {
      title: 'Cinematic Atmosphere',
      artist: 'Musictown',
      img_src: './img/pexels-dorran-1643280.jpg',
      src: './music/Musictown - Cinematic Atmosphere.mp3',
    },
    {
      title: 'Price of Freedom',
      artist: 'ZakharValaha',
      img_src: './img/pexels-viktoria-alipatova-9176859.jpg',
      src: './music/ZakharValaha - Price of Freedom.mp3',
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) return 0;
      return currentSongIndex + 1;
    });
  }, [currentSongIndex]);

  return (
    <div className={styles.container}>
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div >
  );
}

export default App;
