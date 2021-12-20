import { Button, Container, Icon } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import {
  intro,
  myRoutine,
  routineDetail,
  routineCreate,
  routineProgress,
  routineCommunity,
  postDetail,
} from '@/images';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MobileStepper } from '@mui/material';

const OnBoardingPage = (): JSX.Element => {
  const history = useHistory();
  const token = sessionStorage.getItem('YAS_USER_TOKEN');
  const imageList = [
    intro,
    myRoutine,
    routineCreate,
    routineDetail,
    routineProgress,
    routineCommunity,
    postDetail,
  ];
  const textList = [
    'YAS가 처음이신 분들을 위해 준비했어요!',
    '전체, 오늘, 완료한 루틴을 확인해보세요!',
    '새로운 나만의 루틴을 생성해볼까요?',
    '루틴의 세부 미션들을 확인해보세요!',
    '루틴을 시간에 맞춰 진행해보세요!',
    '다른 사람들의 루틴을 구경해볼까요?',
    '댓글과 좋아요로 소통해보세요!',
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
  const handleCommunityClick = () => {
    history.push('/community');
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
      <MobileStepper
        variant="dots"
        steps={7}
        position="static"
        activeStep={currentIndex}
        sx={{ maxWidth: 400, flexGrow: 1, marginTop: '1.5rem' }}
        backButton={''}
        nextButton={''}
      />
      <ButtonContainer>
        <Button onClick={handleSignInClick}>로그인 하러가기</Button>
        <Button colorType="white" onClick={handleCommunityClick}>
          지금 바로 YAS 둘러보기
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
  margin-top: 3rem;
  width: 60%;
  > button {
    margin: 0 1rem 1rem 0;
  }
`;

const ArrowBack = styled(Icon.ArrowBack)`
  cursor: pointer;
  justify-self: flex-start;
  @media ${Media.sm} {
    width: 12px;
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
    width: 12px;
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
