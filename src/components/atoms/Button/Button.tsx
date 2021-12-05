import { Colors, FontWeight, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';

export interface ButtonProps extends React.ComponentProps<'button'> {
  colorType?: 'blue' | 'white';
}

const Button = ({
  children,
  colorType,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <ButtonStyle colorType={colorType} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${({ colorType }) =>
    colorType === 'blue' ? Colors.point : Colors.backgroundButton};
  color: ${({ colorType }) =>
    colorType === 'blue' ? Colors.textQuaternary : Colors.textPrimary};
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  :hover {
    color: ${Colors.textPrimary};
    background-color: ${Colors.pointLight};
  }
  :active {
    color: ${({ colorType }) =>
      colorType === 'blue' ? Colors.textPrimary : Colors.textQuaternary};
    background-color: ${({ colorType }) =>
      colorType === 'blue' ? Colors.backgroundButton : Colors.point};
  }
  @media ${Media.sm} {
    height: 40px;
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    height: 56px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    height: 56px;
    font-size: ${FontSize.medium};
  }
`;

Button.defaultProps = {
  colorType: 'blue',
};

export default Button;
