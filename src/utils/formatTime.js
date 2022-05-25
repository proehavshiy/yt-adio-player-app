export default function formatTime(num) {
  const integer = Number.parseInt(num, 10);

  const hour = Math.trunc(integer / 3600);
  const min = Math.trunc(integer / 60) % 60;
  const sec = integer % 60;

  function format() {
    const getUnitOfTime = (val) => (`0${val}`).slice(-2);
    const tempString = `${getUnitOfTime(hour)}:${getUnitOfTime(min)}:${getUnitOfTime(sec)}`;
    return (!tempString[0] || !tempString[1]) ? tempString : tempString.slice(3);
  }

  return format();
}
