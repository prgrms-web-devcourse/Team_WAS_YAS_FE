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
    <StyledButton colorType={colorType} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  ${({ colorType }) => `
    background-color: ${
      colorType === 'blue' ? Colors.point : Colors.backgroundButton
    };
    color: ${colorType === 'blue' ? Colors.textQuaternary : Colors.textPrimary};
  `}
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  @media (hover: hover) {
    :hover {
      color: ${Colors.textPrimary};
      background-color: ${Colors.pointLight};
    }
  }
  :active {
    ${({ colorType }) => `
      color: ${
        colorType === 'blue' ? Colors.textPrimary : Colors.textQuaternary
      };
    background-color: ${
      colorType === 'blue' ? Colors.backgroundButton : Colors.point
    };`}
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

const defaultProps: ButtonProps = {
  colorType: 'blue',
};

Button.defaultProps = defaultProps;

export default Button;
