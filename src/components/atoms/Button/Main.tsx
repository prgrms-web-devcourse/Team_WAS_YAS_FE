import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { StyledButtonProps } from './Button';

const Main = ({ children, ...props }: StyledButtonProps): JSX.Element => {
  return <MainStyle {...props}>{children}</MainStyle>;
};

const MainStyle = styled.button<StyledButtonProps>`
  width: 100%;
  background-color: ${({ basicColor }) => basicColor};
  color: ${Colors.textQuaternary};
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  :hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  :active {
    color: ${Colors.textPrimary};
    background-color: ${({ activeColor }) => activeColor};
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

Main.defaultProps = {
  basicColor: Colors.point,
  hoverColor: Colors.pointLight,
  activeColor: Colors.backgroundPoint,
};

export default Main;
