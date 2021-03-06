import React from 'react';
import { FontWeight, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import { kakao } from '@/images';

export type ButtonProps = React.ComponentProps<'button'>;

const KakaoSignInButton = ({ ...props }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...props}>
      <LogoImage alt="kakao" src={kakao} />
      <p>카카오 로그인</p>
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  width: 100%;
  background-color: #ffeb3b;
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: ${FontWeight.bold};
  cursor: pointer;
  @media (hover: hover) {
    :hover {
      background-color: #eae08a;
    }
  }
  :active {
    background-color: #dcca2b;
  }
  @media ${Media.sm} {
    height: 48px;
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

const LogoImage = styled.img`
  position: absolute;
  top: 0.6rem;
  left: 1rem;
  @media ${Media.sm} {
    width: 32px;
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    width: 40px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    height: 40px;
    font-size: ${FontSize.medium};
  }
`;

export default KakaoSignInButton;
