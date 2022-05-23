export default function getNextVal(data, objKey, isNext = true) {
  switch (isNext) {
    case true:
      if (data.currIndex >= data.tracks.length - 1) {
        return {
          ...data,
          [objKey]: 0,
        };
      }
      return {
        ...data,
        [objKey]: data.currIndex + 1,
      };

    case false:
      if (data.currIndex <= 0) {
        return {
          ...data,
          [objKey]: data.tracks.length - 1,
        };
      }
      return {
        ...data,
        [objKey]: data.currIndex - 1,
      };
    default:
      return data;
  }
}
