/* eslint-disable react/react-in-jsx-scope */
import styles from './App.module.scss';
import Player from './components/Player/Player';

// "homepage": "https://proehavshiy.github.io/yt-adio-player-app",

function App() {
  return (
    <div className={styles.container}>
      <Player />
    </div >
  );
}

export default App;
