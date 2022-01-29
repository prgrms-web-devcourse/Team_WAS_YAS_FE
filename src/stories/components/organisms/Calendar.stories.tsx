import { Calendar } from '@/components';
// import { UserType, CommentType } from '@/Models';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

export default {
  title: 'Components/Organisms/Calendar',
  component: Calendar,
};

const markedDates = [
  dayjs('2022-01-01'),
  dayjs('2022-01-04'),
  dayjs('2022-01-05'),
  dayjs('2022-01-12'),
  dayjs('2022-01-15'),
];

const highlightDates = {
  '2022-01-01': 2,
  '2022-01-04': 5,
  '2022-01-05': 3,
  '2022-01-12': 1,
  '2022-01-15': 4,
};

export const Default = (): JSX.Element => {
  const handleClickDate = (date: dayjs.Dayjs) => {
    console.log(date);
  };
  return (
    <Container>
      <StyledCalendar
        highlightDates={highlightDates}
        onClickDate={handleClickDate}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalendar = styled(Calendar)`
  width: 800px;
`;
