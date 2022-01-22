import React from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
// import { DatePicker, type DatePickerProps } from '@mui/lab';
import { DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  ArrowBackIosRounded as ArrowBackIcon,
  ArrowForwardIosRounded as ArrowForwardIcon,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

// export type YearMonthPickerProps = DatePickerProps;
export interface YearMonthPickerProps extends React.ComponentProps<'div'> {
  onChangeYearMonth?: (date: Date) => void;
}

const YearMonthPicker = ({
  onChangeYearMonth,
  ...props
}: YearMonthPickerProps): JSX.Element => {
  const [value, setValue] = React.useState<Date>(new Date());

  const handleChange = (date: any) => {
    setValue(date);
    onChangeYearMonth && onChangeYearMonth(date);
  };

  return (
    <Container {...props}>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Picker
          views={['year', 'month']}
          // label="Year and Month"
          inputFormat="YYYY년 MM월"
          minDate={dayjs('2021-01-01')}
          maxDate={dayjs()}
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <YearMonthTextField
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <IconButton>
        <ArrowForwardIcon />
      </IconButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Picker = styled(DatePicker)`
  display: block;
  width: 100%;
`;

const YearMonthTextField = styled(TextField)`
  /* display: inline; */
  width: 124px;
`;

export default YearMonthPicker;
