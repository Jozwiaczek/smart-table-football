const setAdditionalZero = (string) => {
  return string.length === 1 ? `0${string}` : string;
};

export const getTimerUnit = (elapsedTime) => {
  const time = elapsedTime / 1000;
  return {
    min: setAdditionalZero(Math.floor(time / 60).toString()),
    sec: setAdditionalZero(Math.floor(time % 60).toString()),
    msec: (time % 1).toFixed(3).substring(2),
  };
};
