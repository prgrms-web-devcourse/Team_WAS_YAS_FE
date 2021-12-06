import { Colors, FontSize, FontWeight } from '@/styles';
import styled from '@emotion/styled';

export interface TextProps extends React.ComponentProps<'span'> {
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  block?: boolean;
}

const Text = ({ children, ...props }: TextProps): JSX.Element => {
  return <StyledText {...props}>{children}</StyledText>;
};

const StyledText = styled.span<TextProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  display: ${({ block }) => (block ? 'block' : 'inline')};
`;

const defaultProps: TextProps = {
  color: Colors.textPrimary,
  fontSize: FontSize.base,
  fontWeight: FontWeight.regular,
  block: true,
};

Text.defaultProps = defaultProps;

export default Text;
