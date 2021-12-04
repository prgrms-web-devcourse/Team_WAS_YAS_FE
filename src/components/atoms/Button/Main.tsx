import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { ButtonProps } from './Button';

const Main = ({ children, ...props }: ButtonProps): JSX.Element => {
  return <MainStyle {...props}>{children}</MainStyle>;
};

const MainStyle = styled.button`
  width: 100%;
  background-color: ${Colors.point};
  color: ${Colors.textQuaternary};
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  :hover {
    background-color: ${Colors.pointLight};
  }
  :active {
    color: ${Colors.textPrimary};
    background-color: ${Colors.backgroundPoint};
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

export default Main;
