import { DurationTimePicker } from '@/components';
import styled from '@emotion/styled';
import moment from 'moment';

export default {
  title: 'Components/Organisms/DurationTimePicker',
  component: DurationTimePicker,
};

export const Default = (): JSX.Element => {
  const handleChange = (value: any) => {
    const calculateDurationTime =
      moment(value).hours() * 3600 +
      moment(value).minutes() * 60 +
      moment(value).seconds();
    console.log(calculateDurationTime);
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
