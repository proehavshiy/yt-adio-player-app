const tracks = [
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
];

const tracksInitialState = {
  tracks,
  currIndex: 0,
  nextIndexInSequence: 1,
};

const modeInitialState = {
  isRandomMode: false,
  isLoopedTrack: false,
  volume: {
    current: 1,
    prev: 1,
  },
  currTrackData: {
    trackDuration: 0,
    currentTime: 0,
  },
};

export { tracksInitialState, modeInitialState };
