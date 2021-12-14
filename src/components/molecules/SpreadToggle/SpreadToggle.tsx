import React from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import styled from '@emotion/styled';
import { Colors, FontSize } from '@/styles';
import { useToggle } from '@/hooks';

export interface SpreadToggleProps extends React.ComponentProps<'div'> {
  open?: boolean;
}

const SpreadToggle = ({ open, ...props }: SpreadToggleProps): JSX.Element => {
  const [toggled, toggle] = useToggle(open ? open : false);

  return (
    <Container
      onClick={() => {
        toggle();
      }}
      {...props}
    >
      {toggled ? (
        <SpreadButton>
          <KeyboardArrowUpRoundedIcon />
          접기
        </SpreadButton>
      ) : (
        <SpreadButton>
          <KeyboardArrowDownRoundedIcon />
          펼치기
        </SpreadButton>
      )}
    </Container>
  );
};

const Container = styled.div``;

const SpreadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 1rem;
  background-color: transparent;
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};
  padding: 0 0.5rem;
  height: 2rem;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: ${Colors.point};
    }
  }

  &: active {
    color: ${Colors.pointLight};
  }
`;

export default SpreadToggle;
