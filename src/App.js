import React, { useState } from 'react';

function App() {
  const [songs, setSongs] = useState([
    {
      title: 'Order',
      artist: 'ComaStudio',
      img_src: './img/pexels-alexander-kozlov-11784237.jpg',
      src: './music/ComaStudio - Order.mp3',
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

  return (
    <div className="App">
      Music player
    </div>
  );
}

export default App;
