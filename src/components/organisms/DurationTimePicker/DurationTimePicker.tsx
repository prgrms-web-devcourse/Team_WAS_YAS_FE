import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import moment from 'moment';

export interface DurationTimePickerProps {
  onChange: (time: number) => void;
}
const DurationTimePicker = ({
  onChange,
}: DurationTimePickerProps): JSX.Element => {
  const [time, setTime] = React.useState(new Date(0, 0, 0, 1));
  const handleChange = (value: any) => {
    setTime(value);
    const calculateDurationTime =
      moment(value).hours() * 3600 +
      moment(value).minutes() * 60 +
      moment(value).seconds();
    onChange && onChange(calculateDurationTime);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH시간 mm분 ss초"
          mask="__:__:__"
          value={time}
          onChange={handleChange}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'hours' && timeValue > 1) {
              return true;
            }
            return false;
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DurationTimePicker;
