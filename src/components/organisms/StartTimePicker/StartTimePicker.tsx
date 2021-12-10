import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from '@mui/lab';
import { InputProps } from '@/components';
import { TextField } from '@mui/material';

const StartTimePicker = ({ value, onChange }: InputProps): JSX.Element => {
  const handleChange = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default StartTimePicker;
