import { Colors, FontWeight, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';

export interface ButtonProps extends React.ComponentProps<'button'> {
  buttonType?: 'blue' | 'white';
}

const Button = ({
  children,
  buttonType,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <ButtonStyle buttonType={buttonType} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${({ buttonType }) =>
    buttonType === 'blue' ? Colors.point : Colors.backgroundMenu};
  color: ${({ buttonType }) =>
    buttonType === 'blue' ? Colors.textQuaternary : Colors.textPrimary};
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
    color: ${({ buttonType }) =>
      buttonType === 'blue' ? Colors.textPrimary : Colors.textQuaternary};
    background-color: ${({ buttonType }) =>
      buttonType === 'blue' ? Colors.backgroundMenu : Colors.point};
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
  buttonType: 'blue',
};

export default Button;
