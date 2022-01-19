import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('ko');

const calculateTime = (time: number | string): string | null => {
  const parseNumber = +time;
  if (parseNumber === 0) {
    return '0초';
  }
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

const formatStartTime = (time: string): string => {
  return dayjs(time).format('A HH:mm');
};

const dateFromNow = (time: string): string => {
  return dayjs(time).fromNow();
};

const formatMissionTime = (duration: duration.Duration): string => {
  const milliseconds = Math.abs(duration.asMilliseconds());
  return dayjs.duration(milliseconds, 'ms').format('mm:ss');
};

const TimeUtils = {
  calculateTime,
  formatStartTime,
  dateFromNow,
  formatMissionTime,
};

export default TimeUtils;
