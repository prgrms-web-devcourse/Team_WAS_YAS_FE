import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';

const Base = styled.button`
  background: ${Colors.backgroundButton};
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media ${Media.sm} {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
  }
  @media ${Media.md} {
    width: 4rem;
    height: 4rem;
    border-radius: 1.5rem;
  }
  @media ${Media.lg} {
    width: 4rem;
    height: 4rem;
    border-radius: 1.5rem;
  }
`;

export interface RoundedButtonProps extends React.ComponentProps<'button'> {
  active?: boolean;
}

export default Base;
