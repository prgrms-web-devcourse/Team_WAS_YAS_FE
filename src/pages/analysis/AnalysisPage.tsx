import React from 'react';
import { Container } from '@/components';
import styled from '@emotion/styled';
import { analysis } from '@/images';
import { Colors, FontSize, FontWeight, Media } from '@/styles';

const AnalysisPage = (): JSX.Element => {
  return (
    <Container navBar>
      <ContentsContainer>
        <Span>완료한 루틴을 한눈에 확인 가능한</Span>
        <Span>분석 서비스를 준비 중입니다</Span>
        <Image src={analysis} alt="이미지" />
      </ContentsContainer>
    </Container>
  );
};
export default AnalysisPage;

const ContentsContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 500px;
`;

const Span = styled.span`
  margin: 0.5rem 0;
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

const Image = styled.img`
  margin-top: 1.5rem;
  @media ${Media.sm} {
    height: 360px;
  }
  @media ${Media.md} {
    height: 480px;
  }
  @media ${Media.lg} {
    height: 480px;
  }
`;
