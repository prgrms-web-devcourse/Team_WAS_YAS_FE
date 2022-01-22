import { Calendar } from '@/components';
// import { UserType, CommentType } from '@/Models';
import styled from '@emotion/styled';

export default {
  title: 'Components/Organisms/Calendar',
  component: Calendar,
};

export const Default = (): JSX.Element => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <Container>
      <StyledCalendar />
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
