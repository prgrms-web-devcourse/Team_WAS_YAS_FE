import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';

const Base = styled.button`
  background: ${Colors.backgroundModal};
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media ${Media.sm} {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  @media ${Media.md} {
    width: 64px;
    height: 64px;
    border-radius: 24px;
  }
  @media ${Media.lg} {
    width: 64px;
    height: 64px;
    border-radius: 24px;
  }
`;

type Props = React.ComponentProps<'button'>;

export interface ButtonProps extends Props {
  active?: boolean;
}

export default Base;
