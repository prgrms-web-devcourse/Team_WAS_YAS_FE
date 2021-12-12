import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from '@mui/lab';
import { InputProps } from '@/components';
import { TextField } from '@mui/material';

const DurationTimePicker = ({ onChange }: InputProps): JSX.Element => {
  const [time, setTime] = React.useState(new Date(0, 0, 0, 1));
  const handleChange = (value: any) => {
    setTime(value);
    onChange && onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        ampmInClock={false}
        views={['hours', 'minutes', 'seconds']}
        inputFormat="hh시간 mm분 ss초"
        mask="__:__"
        label="지속 시간"
        value={time}
        shouldDisableTime={(timeValue, clockType) => {
          if (clockType === 'hours' && timeValue > 1) {
            return true;
          }
          return false;
        }}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DurationTimePicker;
