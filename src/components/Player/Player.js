import React from 'react';
import styles from './Player.module.scss';

function Player() {
  return (
    <div className={styles.player}>
      <audio src=""></audio>
      <h4>Playing now</h4>
      {/* DETAILS */}
      {/* CONTROLS */}
      <p><strong>Next up:</strong>Kindes Regards by Witt Lory</p>
    </div>
  );
}

export default Player;
