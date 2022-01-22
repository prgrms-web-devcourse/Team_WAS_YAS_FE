import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styled from '@emotion/styled';
// import { DatePicker, type DatePickerProps } from '@mui/lab';
import { DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  ArrowBackIosRounded as PrevIcon,
  ArrowForwardIosRounded as NextIcon,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { MIN_DATE } from './constants';

// export type YearMonthPickerProps = DatePickerProps;
dayjs.extend(isBetween);
export interface YearMonthPickerProps extends React.ComponentProps<'div'> {
  onChangeYearMonth?: (date: Date) => void;
}

const YearMonthPicker = ({
  onChangeYearMonth,
  ...props
}: YearMonthPickerProps): JSX.Element => {
  const [date, setDate] = React.useState<dayjs.Dayjs>(dayjs());

  const handleChange = (date: any) => {
    setDate(date);
    onChangeYearMonth && onChangeYearMonth(date);
  };

  const handleClickPrevIcon = () => {
    setDate((date) => date.add(-1, 'month'));
  };

  const handleClickNextIcon = () => {
    setDate((date) => date.add(1, 'month'));
  };

  return (
    <Container {...props}>
      <IconButton
        onClick={handleClickPrevIcon}
        disabled={
          date.get('year') === dayjs(MIN_DATE).get('year') &&
          date.get('month') <= dayjs(MIN_DATE).get('month')
        }
      >
        <PrevIcon />
      </IconButton>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Picker
          views={['year', 'month']}
          // label="Year and Month"
          // readOnly
          inputFormat="YYYY년 MM월"
          minDate={dayjs(MIN_DATE)}
          maxDate={dayjs()}
          value={date}
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
      <IconButton
        onClick={handleClickNextIcon}
        disabled={
          date.get('year') === dayjs().get('year') &&
          date.get('month') >= dayjs().get('month')
        }
      >
        <NextIcon />
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
