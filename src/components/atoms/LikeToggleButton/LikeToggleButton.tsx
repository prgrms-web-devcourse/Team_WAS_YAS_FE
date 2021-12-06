import React from 'react';
import { Icon } from '@/components';
import { useToggle } from '@/hooks';
import styled from '@emotion/styled';

export interface LikeToggleButtonProps extends React.ComponentProps<'span'> {
  active: boolean;
}

const LikeToggleButton = ({
  active,
  onClick,
  ...props
}: LikeToggleButtonProps): JSX.Element => {
  const [toggled, toggle] = useToggle(active);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    toggle();
    onClick && onClick(e);
  };

  return (
    <Wrapper onClick={handleClick} {...props}>
      {toggled ? <Icon.Like /> : <Icon.LikeBorder />}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  cursor: pointer;
`;

const defaultProps: LikeToggleButtonProps = {
  active: false,
};

LikeToggleButton.defaultProps = defaultProps;

export default LikeToggleButton;
