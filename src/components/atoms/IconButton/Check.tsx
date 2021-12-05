import { IconButtonProps } from './IconButton';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';

const Check = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <StyledButton {...props}>
      <StyledSvg
        viewBox="0 0 33 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.8787 0.879946C28.4421 0.343502 29.192 0.0469339 29.9699 0.0528204C30.7479 0.0587068 31.4932 0.366588 32.0485 0.911497C32.6038 1.45641 32.9256 2.19572 32.9462 2.97344C32.9668 3.75116 32.6844 4.50646 32.1587 5.07995L16.1987 25.0399C15.9242 25.3355 15.593 25.5728 15.2248 25.7374C14.8566 25.9021 14.459 25.9908 14.0557 25.9983C13.6524 26.0057 13.2518 25.9318 12.8777 25.7809C12.5037 25.63 12.1639 25.4052 11.8787 25.1199L1.29468 14.5359C0.99993 14.2613 0.763521 13.9301 0.599554 13.5621C0.435586 13.1941 0.347418 12.7968 0.340311 12.394C0.333203 11.9912 0.407303 11.5911 0.558187 11.2176C0.709071 10.844 0.933649 10.5047 1.21852 10.2198C1.5034 9.93492 1.84273 9.71034 2.21629 9.55946C2.58984 9.40857 2.98996 9.33447 3.39277 9.34158C3.79558 9.34869 4.19283 9.43685 4.56083 9.60082C4.92883 9.76479 5.26003 10.0012 5.53468 10.2959L13.9107 18.6679L27.8027 0.967947C27.8277 0.937151 27.8544 0.907771 27.8827 0.879946H27.8787Z"
          fill={Colors.textQuaternary}
        />
      </StyledSvg>
    </StyledButton>
  );
};

export default Check;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;
  background-color: ${Colors.point};
  cursor: pointer;

  @media ${Media.sm} {
    width: 48px;
    height: 48px;
  }
  @media ${Media.md} {
    width: 64px;
    height: 64px;
  }
  @media ${Media.lg} {
    width: 64px;
    height: 64px;
  }

  &:hover {
    background-color: ${Colors.pointLight};
  }

  &:active {
    background-color: ${Colors.backgroundButton};
  }
`;

const StyledSvg = styled.svg`
  @media ${Media.sm} {
    width: 25px;
    height: 20px;
  }
  @media ${Media.md} {
    width: 33px;
    height: 26px;
  }
  @media ${Media.lg} {
    width: 33px;
    height: 26px;
  }
`;
