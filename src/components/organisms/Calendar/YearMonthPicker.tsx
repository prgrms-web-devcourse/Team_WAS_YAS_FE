import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styled from '@emotion/styled';
import { DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  ArrowBackIosRounded as PrevIcon,
  ArrowForwardIosRounded as NextIcon,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { MIN_DATE } from './constants';

dayjs.extend(isBetween);
export interface YearMonthPickerProps extends React.ComponentProps<'div'> {
  onChangeYearMonth?: (date: dayjs.Dayjs) => void;
}

const YearMonthPicker = ({
  onChangeYearMonth,
  ...props
}: YearMonthPickerProps): JSX.Element => {
  const [date, setDate] = React.useState<dayjs.Dayjs>(dayjs());

  const handleChange = (date: any) => {
    // TODO: DatePicker의 date타입을 제네릭을 이용하여 dayjs.Dayjs으로 변경하기
    setDate(date);
    onChangeYearMonth && onChangeYearMonth(date);
  };

  const handleClickPrevIcon = () => {
    const newDate = date.add(-1, 'month');
    setDate(() => newDate);
    handleChange(newDate);
  };

  const handleClickNextIcon = () => {
    const newDate = date.add(1, 'month');
    setDate(() => newDate);
    handleChange(newDate);
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
  width: 124px;
`;

export default YearMonthPicker;
