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
  const [time, setTime] = React.useState(new Date(0, 0, 0, 0, 10));
  const handleChange = (value: any) => {
    setTime(value);
    const calculateDurationTime =
      moment(value).minutes() * 60 + moment(value).seconds();
    onChange && onChange(calculateDurationTime);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          ampm={false}
          views={['minutes', 'seconds']}
          inputFormat="mm분 ss초"
          disableMaskedInput={true}
          value={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DurationTimePicker;
