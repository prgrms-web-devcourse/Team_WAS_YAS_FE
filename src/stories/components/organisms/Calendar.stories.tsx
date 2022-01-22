import { Calendar } from '@/components';
// import { UserType, CommentType } from '@/Models';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

export default {
  title: 'Components/Organisms/Calendar',
  component: Calendar,
};

export const Default = (): JSX.Element => {
  const handleClickDate = (date: dayjs.Dayjs) => {
    console.log(date);
  };
  return (
    <Container>
      <StyledCalendar onClickDate={handleClickDate} />
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
