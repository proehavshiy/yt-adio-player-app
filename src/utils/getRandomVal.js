export default function getRandomVal(max, exclude) {
  const getRandom = () => Math.floor(Math.random() * max);
  const randomInt = getRandom();

  return exclude.indexOf(randomInt) === -1 ? randomInt : getRandomVal(max, exclude);
}
