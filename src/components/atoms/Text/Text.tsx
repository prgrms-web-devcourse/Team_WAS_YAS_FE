import { Colors, FontSize, FontWeight } from '@/styles';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  block?: boolean;
}

const Text = styled.span<Props>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  display: ${({ block }) => (block ? 'block' : 'inline')};
`;

Text.defaultProps = {
  color: Colors.textPrimary,
  fontSize: FontSize.base,
  fontWeight: FontWeight.regular,
  block: true,
};

export type { Props };
export default Text;
