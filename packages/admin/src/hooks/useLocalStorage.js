const { useState } = require('react');

const useLocalStorage = (key, initialValue) => {
  const setLocalValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    } catch (error) {
      console.log(error);
    }
  };

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item && initialValue) {
        setLocalValue(initialValue);
        return initialValue;
      }

      if (!item) {
        return null;
      }

      try {
        return JSON.parse(item);
      } catch (ignore) {
        return item;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(setLocalValue(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
