import { useCallback, useEffect, useRef, useState } from 'react';

function useInterval(callback, delay, delayFn) {
  const savedCallback = useRef();
  const intervalId = useRef(null);
  const [currentDelay, setDelay] = useState(delay);

  const toggleRunning = useCallback(() => {
    setDelay((currentDelay) => {
      delayFn(!!currentDelay);
      return currentDelay === null ? delay : null;
    });
  }, [delay, delayFn]);

  const clear = useCallback(() => clearInterval(intervalId.current), []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (intervalId.current) clear();

    if (currentDelay !== null) {
      intervalId.current = setInterval(tick, currentDelay);
    }

    return clear;
  }, [currentDelay, clear]);

  return toggleRunning;
}

export default useInterval;
