import React from 'react';
import { Container } from '@/components';
import styled from '@emotion/styled';
import notFoundImg from '@/images/notFoundImg.png';
import { Colors, FontSize, FontWeight, Media } from '@/styles';

const NotFoundPage = (): JSX.Element => {
  return (
    <Container navBar>
      <ContentsContainer>
        <Img src={notFoundImg} alt="이미지" />
        <Span>존재하지 않는 페이지입니다!</Span>
      </ContentsContainer>
    </Container>
  );
};
export default NotFoundPage;

const ContentsContainer = styled.div`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 500px;
`;
const Span = styled.span`
  font-weight: ${FontWeight.bold}
  color: ${Colors.textSecondary};
  @media ${Media.sm} {
    font-size: ${FontSize.small};
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
    height: 140px;
  }
  @media ${Media.md} {
    height: 236px;
  }
  @media ${Media.lg} {
    height: 236px;
  }
`;
