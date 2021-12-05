import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';

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
    border: 4px solid ${Colors.point};
  }
`;

export default Input;
