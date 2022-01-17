import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Colors, FontSize, Shadow } from '@/styles';
import { useClickAway } from '@/hooks';
// import Container from './Container';
import { Icon } from '@/components/';

export interface UserToolBoxProps extends React.ComponentProps<'div'> {
  onClickUserButton?: (e: React.MouseEvent) => void;
  onClickSignOutButton?: (e: React.MouseEvent) => void;
  visible?: boolean;
  onClose?: () => void;
}

const UserToolBox = ({
  visible = true,
  onClose,
  onClickUserButton,
  onClickSignOutButton,
  style,
  ...props
}: UserToolBoxProps): JSX.Element => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const handleClickUserButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('handleClickUserButton');
    onClickUserButton && onClickUserButton(e);
  };

  const handleClickSignOutButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('handleClickSignOutButton');
    onClickSignOutButton && onClickSignOutButton(e);
  };

  return (
    <Container
      ref={ref}
      style={{ display: visible ? 'inline-flex' : 'none', ...style }}
      {...props}
    >
      <StyledButton onClick={handleClickUserButton}>
        <AccountBoxRoundedIcon color="action" />
        <Text>마이페이지</Text>
      </StyledButton>
      <StyledButton onClick={handleClickSignOutButton}>
        <ExitToAppRoundedIcon color="action" />
        <Text>로그아웃</Text>
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: ${Shadow.menu};
  border-radius: 0.5rem;
  z-index: 1;
`;

const Text = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  & svg {
    margin-right: 0.5rem;
  }

  &:hover {
    & path {
      fill: ${Colors.point};
    }

    & p {
      color: ${Colors.point};
    }
  }
`;

export default UserToolBox;
