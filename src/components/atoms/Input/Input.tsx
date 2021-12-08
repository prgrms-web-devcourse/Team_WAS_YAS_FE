import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';

export type InputProps = React.ComponentProps<'input'>;

const Input = styled.input`
  display: block;
  padding: 0 16px;
  width: 100%;
  color: ${Colors.textPrimary};
  border: 2px solid ${Colors.textTertiary};
  border-radius: 8px;
  background-color: transparent;

  @media ${Media.sm} {
    height: 46px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    height: 56px;
    font-size: ${FontSize.large};
  }
  @media ${Media.lg} {
    height: 56px;
    font-size: ${FontSize.large};
  }

  &:focus {
    border: 2px solid ${Colors.textQuaternary};
    outline: 2px solid ${Colors.point};
  }
`;

export default Input;
