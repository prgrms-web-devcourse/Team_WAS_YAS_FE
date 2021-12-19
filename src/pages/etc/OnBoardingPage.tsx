import { Button, Container, Icon } from '@/components';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import myRoutine from '@/images/myRoutine.png';
import routineDetail from '@/images/routineDetail.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const OnBoardingPage = (): JSX.Element => {
  const history = useHistory();
  const token = sessionStorage.getItem('YAS_USER_TOKEN');
  const imageList = [myRoutine, routineDetail];
  const textList = [
    '나만의 루틴을 생성하고 지켜나가보세요!',
    '루틴의 세부 미션들을 생성해보세요!',
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const handleSignInClick = () => {
    if (token) {
      Swal.fire({
        icon: 'info',
        title: '이미 로그인이 되어있습니다!',
        text: '나의 루틴 페이지로 이동합니다',
      }).then(() => {
        history.push('/');
      });
    } else {
      history.push('/mypage/signin');
    }
  };
  const handleSignUpClick = () => {
    if (token) {
      Swal.fire({
        icon: 'info',
        title: '로그아웃 진행 후 회원가입해주세요!',
        text: '마이 페이지로 이동합니다',
      }).then(() => {
        history.push('/mypage');
      });
    } else {
      history.push('/mypage/signup');
    }
  };
  return (
    <Container>
      <Span>{textList[currentIndex]}</Span>
      <ContentsContainer>
        {currentIndex !== 0 ? <ArrowBack onClick={handlePrevClick} /> : <div />}
        <Image src={imageList[currentIndex]} alt="onBoardingImage" />
        {currentIndex !== imageList.length - 1 ? (
          <ArrowForward onClick={handleNextClick} />
        ) : (
          <div />
        )}
      </ContentsContainer>
      <ButtonContainer>
        <Button onClick={handleSignInClick}>로그인 하러가기</Button>
        <Button colorType="white" onClick={handleSignUpClick}>
          회원가입 하러가기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default OnBoardingPage;

const ContentsContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;
`;

const Image = styled.img`
  @media ${Media.sm} {
    height: 360px;
  }
  @media ${Media.md} {
    height: 424px;
  }
  @media ${Media.lg} {
    height: 424px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 4rem;
  width: 60%;
  > button {
    margin: 0 1rem 1rem 0;
  }
`;

const ArrowBack = styled(Icon.ArrowBack)`
  cursor: pointer;
  justify-self: flex-start;
  @media ${Media.sm} {
    width: 8px;
  }
  @media ${Media.md} {
    width: 16px;
  }
  @media ${Media.lg} {
    width: 16px;
  }
`;

const ArrowForward = styled(Icon.ArrowForward)`
  cursor: pointer;
  justify-self: flex-end;
  @media ${Media.sm} {
    width: 8px;
  }
  @media ${Media.md} {
    width: 16px;
  }
  @media ${Media.lg} {
    width: 16px;
  }
`;

const Span = styled.span`
  margin: 2rem 0;
  font-size: ${FontSize.medium};
  color: ${Colors.textSecondary};
`;
