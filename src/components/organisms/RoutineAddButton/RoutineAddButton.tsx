import React, { useState } from 'react';
import { IconButton, IconButtonProps, Button, Icon } from '@/components';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { useHistory } from 'react-router-dom';

export type RoutineAddButtonProps = React.ComponentProps<'div'>;

const RoutineAddButton = ({ ...props }: RoutineAddButtonProps): JSX.Element => {
  const history = useHistory();
  const [active, setActive] = useState(false);

  return (
    <Container {...props}>
      {active && (
        <ButtonWrapper>
          <StyledButton
            colorType="white"
            onClick={() => {
              history.push('/community');
            }}
          >
            <Icon.Community />
            추천 루틴
          </StyledButton>
          <StyledButton
            colorType="white"
            onClick={() => {
              history.push('/routine/create');
            }}
          >
            <Icon.Add />
            루틴 생성
          </StyledButton>
        </ButtonWrapper>
      )}
      <AddButton
        open={active}
        onClick={() => {
          setActive((active) => !active);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.medium};

  &:hover {
    & path {
      fill: ${Colors.point};
    }
  }

  &:active {
    & path {
      fill: ${Colors.pointLight};
    }
  }

  @media ${Media.sm} {
    width: 120px;
    height: 40px;
  }
  @media ${Media.md} {
    width: 150px;
    height: 50px;
  }
  @media ${Media.lg} {
    width: 150px;
    height: 50px;
  }
`;

const AddButton = styled(IconButton.Add)<IconButtonProps & { open: boolean }>`
  align-self: flex-end;
  transition: 0.125s all ease-out;

  ${({ open }) =>
    open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: rotate(45deg);
    `}
`;

export default RoutineAddButton;
