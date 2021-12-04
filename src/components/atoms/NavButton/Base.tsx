import { colors, media } from '@/styles';
import styled from '@emotion/styled';

const Base = styled.button`
  background: ${colors['background-modal']};
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media ${media.sm} {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  @media ${media.md} {
    width: 64px;
    height: 64px;
    border-radius: 24px;
  }
  @media ${media.lg} {
    width: 64px;
    height: 64px;
    border-radius: 24px;
  }
`;

export interface NavButtonProps {
  active?: boolean;
}

export default Base;
