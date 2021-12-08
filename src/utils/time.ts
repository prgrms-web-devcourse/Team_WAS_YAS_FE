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
  return `${hour !== 0 ? `${hour}시간` : ''}${
    minute !== 0 ? ` ${minute}분` : ''
  }${second !== 0 ? ` ${second}초` : ''}`;
};

const startTime = (time: string): string => {
  return moment(time).format('LT');
};

const TimeUtils = {
  calculateTime,
  startTime,
};

export default TimeUtils;
