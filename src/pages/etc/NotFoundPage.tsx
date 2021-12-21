import React from 'react';
import { Container } from '@/components';
import styled from '@emotion/styled';
import { logo } from '@/images';
import { Colors, FontSize, FontWeight, Media } from '@/styles';

const NotFoundPage = (): JSX.Element => {
  return (
    <Container navBar>
      <ContentsContainer>
        <Img src={logo} alt="이미지" />
        <Span>존재하지 않는 페이지입니다!</Span>
      </ContentsContainer>
    </Container>
  );
};
export default NotFoundPage;

const ContentsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  @media ${Media.sm} {
    min-height: 400px;
  }
  @media ${Media.md} {
    min-height: 500px;
  }
  @media ${Media.lg} {
    min-height: 500px;
  }
`;

const Span = styled.span`
  margin: 1rem 0;
  color: ${Colors.textSecondary};
  font-weight: ${FontWeight.medium};
  @media ${Media.sm} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    font-size: ${FontSize.large};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.large};
  }
`;

const Img = styled.img`
  @media ${Media.sm} {
    height: 100px;
  }
  @media ${Media.md} {
    height: 140px;
  }
  @media ${Media.lg} {
    height: 140px;
  }
`;
