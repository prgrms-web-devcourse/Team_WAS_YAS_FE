import React, { useState } from 'react';
import { Icon } from '@/components';
import { useToggle } from '@/hooks';
import styled from '@emotion/styled';
import { Media, FontSize, Colors } from '@/styles';

export interface LikeBoxProps
  extends Omit<React.ComponentProps<'span'>, 'onClick'> {
  active?: boolean;
  onClick?: (count: number) => void;
  count: number;
  interactive?: boolean;
}

const LikeBox = ({
  active,
  interactive,
  onClick,
  count: initCount,
  ...props
}: LikeBoxProps): JSX.Element => {
  const [toggled, toggle] = useToggle(active ? true : false);
  const [count, setCount] = useState<number>(initCount);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!interactive) return;
    toggle();
    const newCount = toggled ? count - 1 : count + 1;
    setCount(() => newCount);
    onClick && onClick(newCount);
  };

  return (
    <Wrapper onClick={handleClick} {...props}>
      {toggled ? <Icon.Like /> : <Icon.LikeBorder />}
      <Text>{count}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-content: center;
  gap: 4px;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${Colors.textSecondary};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.base};
  }
`;

const defaultProps: LikeBoxProps = {
  active: false,
  interactive: false,
  count: 0,
};

LikeBox.defaultProps = defaultProps;

export default LikeBox;
