import React from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
// eslint-disable-next-line
import { ButtonBase, ButtonBaseProps } from '@mui/material';
import styled from '@emotion/styled';
import { Colors, FontSize } from '@/styles';

export interface BackButtonProps extends ButtonBaseProps {
  visible?: boolean;
}

const BackButton = ({ visible, ...props }: BackButtonProps): JSX.Element => {
  return (
    <Button visible={visible ? 1 : 0} {...props}>
      <ArrowBackIcon />
      <Text>뒤로가기</Text>
    </Button>
  );
};

const Button = styled(ButtonBase)<ButtonBaseProps & { visible: number }>`
  display: flex;
  font-size: ${FontSize.base};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  @media (hover: hover) {
    :hover {
      color: ${Colors.point};
    }
  }
`;

const ArrowBackIcon = styled(ArrowBackIosRoundedIcon)`
  margin-right: 0.5rem;
  font-size: 1rem;

  @media (hover: hover) {
    :hover {
      color: ${Colors.point};
    }
  }
`;

const Text = styled.p`
  font-size: ${FontSize.small};
`;

export default BackButton;
