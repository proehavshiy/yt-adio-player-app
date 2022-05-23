import getRandomVal from './getRandomVal';

export default function getRandomNextSong(data, objKey) {
  return {
    ...data,
    [objKey]: getRandomVal(data.tracks.length, [data.currIndex]),
  };
}
