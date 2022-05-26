export default function getClickCoordsInsideArea(event, area) {
  let {
    clientX, clientY,
  } = event;

  // если это touchEvent, то достаем координаты мыш иначе
  if (event.targetTouches) {
    clientX = event.targetTouches[0].clientX;
    clientY = event.targetTouches[0].clientY;
  }

  const {
    width, height, left, top,
  } = area.getBoundingClientRect();

  // доля от area, куда кликнули 0 - 1
  let clickInsideAreaX = (clientX - left) / width;
  let clickInsideAreaY = (clientY - top) / height;

  // нам нужны координаты только внутри area
  if (clickInsideAreaX > 1) clickInsideAreaX = 1;
  if (clickInsideAreaX < 0) clickInsideAreaX = 0;

  if (clickInsideAreaY > 1) clickInsideAreaY = 1;
  if (clickInsideAreaY < 0) clickInsideAreaY = 0;

  return {
    clickX: clientX,
    clickY: clientY,
    clickInsideAreaX,
    clickInsideAreaY,
  };
}
