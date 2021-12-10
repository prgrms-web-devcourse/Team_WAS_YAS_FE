import { StartTimePicker } from '@/components';
import styled from '@emotion/styled';
import { useState } from 'react';

export default {
  title: 'Components/Organisms/StartTimePicker',
  component: StartTimePicker,
};

export const Default = (): JSX.Element => {
  const [time, setTime] = useState<any>(new Date());
  const handleChange = (value: any) => {
    setTime(value);
  };
  return (
    <StyledTimePicker>
      <StartTimePicker value={time} onChange={handleChange} />
    </StyledTimePicker>
  );
};

const StyledTimePicker = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
