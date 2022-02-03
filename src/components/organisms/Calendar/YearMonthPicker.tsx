import React from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import styled from '@emotion/styled';
import { DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  ArrowBackIosRounded as PrevIcon,
  ArrowForwardIosRounded as NextIcon,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { MIN_DATE } from './constants';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
export interface YearMonthPickerProps extends React.ComponentProps<'div'> {
  initialYearMonth?: dayjs.Dayjs;
  onChangeYearMonth?: (date: dayjs.Dayjs) => void;
}

const YearMonthPicker = ({
  initialYearMonth = dayjs(),
  onChangeYearMonth,
  ...props
}: YearMonthPickerProps): JSX.Element => {
  const [date, setDate] = React.useState<dayjs.Dayjs>(
    dayjs(initialYearMonth.format('YYYY-MM')),
  );

  const handleChange = (date: any) => {
    // TODO: DatePicker의 date타입을 제네릭을 이용하여 dayjs.Dayjs으로 변경하기
    if (isNaN(date.get('year')) || isNaN(date.get('month'))) return;
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
        disabled={date.isSameOrBefore(dayjs(MIN_DATE), 'month')}
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
              type="text"
              label="Read Only"
              // TODO: InputProps 적용되지 않음, 해결방법 찾아보기
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
        disabled={date.isSameOrAfter(dayjs(), 'month')}
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

const Picker = styled(DesktopDatePicker)`
  display: block;
  width: 100%;
`;

const YearMonthTextField = styled(TextField)`
  width: 124px;
`;

export default YearMonthPicker;
