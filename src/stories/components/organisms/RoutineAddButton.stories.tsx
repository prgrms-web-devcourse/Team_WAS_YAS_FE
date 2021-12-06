import { RoutineAddButton } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Components/Organisms/RoutineAddButton',
  component: RoutineAddButton,
};

const StyledRoutineAddButton = styled(RoutineAddButton)`
  position: fixed;
  right: 10px;
  bottom: 10px;
`;

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <StyledRoutineAddButton />
    </>
  );
};
