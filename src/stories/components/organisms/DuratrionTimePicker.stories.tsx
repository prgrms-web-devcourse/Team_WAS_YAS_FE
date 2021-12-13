import { DurationTimePicker } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Components/Organisms/DurationTimePicker',
  component: DurationTimePicker,
};

export const Default = (): JSX.Element => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <StyledDurationTimePicker>
      <DurationTimePicker onChange={handleChange} />
    </StyledDurationTimePicker>
  );
};

const StyledDurationTimePicker = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
