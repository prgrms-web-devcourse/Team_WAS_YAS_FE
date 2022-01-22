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

export const Default = (): JSX.Element => {
  const handleClickDate = (date: dayjs.Dayjs) => {
    console.log(date);
  };
  return (
    <Container>
      <StyledCalendar markedDates={markedDates} onClickDate={handleClickDate} />
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
