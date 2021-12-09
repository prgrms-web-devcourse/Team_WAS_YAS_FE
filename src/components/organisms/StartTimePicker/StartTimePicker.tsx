import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DesktopTimePicker } from '@mui/lab';
import { TextField } from '@mui/material';

const StartTimePicker = (): JSX.Element => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        value={value}
        label="For desktop"
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default StartTimePicker;
