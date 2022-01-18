import { useEffect, useState } from 'react';
import qs from 'qs';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { Container, Spinner } from '@/components';
import { userApi } from '@/apis';
import { logo } from '@/images';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store';

const SocialSignInPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const singIn = async () => {
      const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      console.log(query);

      if (!query.hasOwnProperty('token')) {
        Swal.fire({
          icon: 'error',
          text: '잘못된 접근입니다.',
          confirmButtonColor: Colors.point,
        }).then(() => {
          history.push('/');
        });
      }

      sessionStorage.setItem('YAS_USER_TOKEN', JSON.stringify(query.token));
      await dispatch(fetchUser());
    };
    singIn();

    setLoading(false);
    history.push('/');
  }, [location]);

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
