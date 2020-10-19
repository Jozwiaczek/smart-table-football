import { useEffect } from 'react';

const useOnBeforeUnload = (callback) => {
  useEffect(() => {
    window.onbeforeunload = async () => {
      await callback();
    };
  }, [callback]);
};

export default useOnBeforeUnload;
