import moment from 'moment';
import 'moment/locale/ko';

const calculateTime = (time: number | string): string | null => {
  const parseNumber = +time;
  if (!parseNumber) {
    return null;
  }

  const hour: number = Math.floor(parseNumber / 3600);
  const minute: number = Math.floor(parseNumber / 60) - 60 * hour;
  const second: number = parseNumber - (hour * 3600 + minute * 60);

  if (hour > 0) {
    return `${hour !== 0 ? `${hour}시간` : ''}${
      minute !== 0 ? ` ${minute}분` : ''
    }`;
  } else {
    return `${minute !== 0 ? ` ${minute}분` : ''}${
      second !== 0 ? ` ${second}초` : ''
    }`;
  }
};

const startTime = (time: string): string => {
  return moment(time).format('LT');
};

const dateFromNow = (time: string): string => {
  return moment(time).startOf('day').fromNow();
};

const timeFormat = (duration: any): string => {
  const { seconds: s, minutes: m, hours: h } = duration._data;
  const seconds = Math.abs(s);
  const minutes = Math.abs(m);
  const hours = Math.abs(h);
  return `${hours >= 1 ? `0${hours}:` : ''}${
    minutes >= 10 ? `${minutes}` : `0${minutes}`
  }:${seconds >= 10 ? `${seconds}` : `0${seconds}`}`;
};

const TimeUtils = {
  calculateTime,
  startTime,
  dateFromNow,
  timeFormat,
};

export default TimeUtils;
