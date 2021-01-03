import { useState, useEffect } from 'react';
import moment from 'moment';

import useLocalStorage from './useLocalStorage';

const checkForIOS = ([installPrompt, setInstallPrompt]) => {
  if (navigator.standalone) {
    return false;
  }

  const today = moment().toDate();
  const lastPrompt = moment(installPrompt);
  const days = moment(today).diff(lastPrompt, 'days');
  const ua = window.navigator.userAgent;
  const isAndroid = !!ua.match(/Android/i);
  const webkit = !!ua.match(/WebKit/i);
  const isIPad = !!ua.match(/iPad/i);
  const isIPhone = !!ua.match(/iPhone/i);
  const isIOS = isIPad || isIPhone;
  const isSafari = isIOS && webkit && !ua.match(/CriOS/i);

  // eslint-disable-next-line no-restricted-globals
  const prompt = (isNaN(days) || days > 30) && ((isIOS && isSafari) || isAndroid);

  if (prompt) {
    setInstallPrompt(today);
  }

  return { isIOS, isSafari, prompt };
};

export default function usePWAPromptCheck() {
  const [isIOS, setIsIOS] = useState({});
  const installPrompt = useLocalStorage('installPrompt');

  useEffect(() => {
    setIsIOS(checkForIOS(installPrompt));
    // eslint-disable-next-line
  }, []);

  return isIOS;
}
