import { useState } from 'react';
import { IconButton, Button } from '@/components';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight } from '@/styles';
import { useClickAway } from '@/hooks';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

interface ComboButton extends React.ComponentProps<'div'> {
  onClose: () => void;
}

const ComboButton = ({ onClose, ...props }: ComboButton): JSX.Element => {
  const history = useHistory();
  const ref = useClickAway(() => {
    console.log('clicked away');
    onClose && onClose();
  });

  return (
    <>
      <ButtonWrapper ref={ref} {...props}>
        <StyledButton
          colorType="white"
          onClick={() => {
            history.push('/community');
          }}
        >
          추천 루틴
        </StyledButton>
        <StyledButton
          colorType="white"
          onClick={() => {
            history.push('/routine/create');
          }}
        >
          루틴 생성
        </StyledButton>
      </ButtonWrapper>
    </>
  );
};

const RoutineAddButton = (): JSX.Element => {
  const [active, setActive] = useState(false);

  return (
    <Container>
      {active && <ComboButton onClose={() => setActive(false)} />}
      <AddButton onClick={() => setActive(true)} />
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 50px;
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.medium};
`;

const AddButton = styled(IconButton.Add)`
  align-self: flex-end;
  right: 5px;
  bottom: -20px;
`;

export default RoutineAddButton;
