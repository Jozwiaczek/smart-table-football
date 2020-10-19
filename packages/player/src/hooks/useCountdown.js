import { useCallback, useRef, useState } from 'react';

const useCountdown = () => {
  const [countdownProgress, setCountdownProgress] = useState(0);
  const countDownInterval = useRef();

  const startCountdown = useCallback(() => {
    countDownInterval.current = setInterval(() => {
      setCountdownProgress((oldCompleted) => {
        return oldCompleted + 1;
      });
    }, 55);
  }, []);

  const clearCountdown = useCallback(() => {
    clearInterval(countDownInterval.current);
    setCountdownProgress(0);
  }, []);

  return [countdownProgress, startCountdown, clearCountdown];
};

export default useCountdown;
