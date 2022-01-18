import { useEffect, useState } from 'react';
import qs from 'qs';
import styled from '@emotion/styled';
import { Container, Spinner } from '@/components';
import { logo } from '@/images';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { useLocation } from 'react-router-dom';

const SocialSignInPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(query);
    setLoading(false);
  }, []);

  return (
    <Container navBar>
      <ContentsContainer>
        <Img src={logo} alt="이미지" />
        <Span>소셜로그인을 진행합니다.</Span>
      </ContentsContainer>
      {loading && <Spinner />}
    </Container>
  );
};

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

export default SocialSignInPage;
