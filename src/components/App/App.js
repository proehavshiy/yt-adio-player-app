import React from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
// components
import Player from '../Player/Player';

// styles
const cn = classNames.bind(styles);
const { container } = styles;

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function App() {
  return (
    <div className={cn(container)}>
      <Player />
    </div >
  );
}

export default App;
