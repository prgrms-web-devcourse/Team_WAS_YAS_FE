import { useEffect, useState } from 'react';
import { Button, Container, RoutineInfo, RoutineProgress } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { missionStatusApi, routineApi } from '@/apis';
import Swal from 'sweetalert2';
import { RoutineReviewModal } from '@/components/organisms/RoutineReviewModal';
import { RoutineReviewType } from '@/Models';

interface RoutineInfoType {
  emoji: string;
  name: string;
  durationGoalTime: number;
}

const RoutineFinishPage = (): JSX.Element => {
  const history = useHistory();
  const params = useParams();
  const routineId = params['id'] && +params['id'];
  const [todayMissionStatus, setTodayMissionStatus] = useState<any>([]);
  const [routineInfo, setRoutineInfo] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const reviewInfo: RoutineReviewType = {
    routineStatusId: Number(routineId),
    emotion: 2,
    content: '안녕하세요',
    routineStatusImage: [
      {
        routineStatusImageId: 1,
        imageUrl:
          'https://yas-bucket.s3.ap-northeast-2.amazonaws.com/static/review/sun.nio.ch.ChannelInputStream%4012b30cf7',
      },
    ],
    deletedImages: [],
    reviewImages: [],
  };

  const getFinishedRoutineDetail = async () => {
    if (!routineId) return;
    try {
      const notFinishedRoutines = await routineApi.getNotFinishedRoutines();
      const notFinishedRoutineIds = notFinishedRoutines.data.data.map(
        (routine: { routineId: number }) => routine.routineId,
      );

      if (notFinishedRoutineIds.includes(routineId)) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '루틴을 수행하지 않았네요!',
          text: '해당 루틴페이지로 이동합니다',
          showConfirmButton: false,
          timer: 2000,
        });
        history.replace(`/routine/${routineId}`);
      } else {
        const result = await missionStatusApi.getMissionStatus(routineId);
        const missionStatus = result.data.data
          ?.filter(
            (status: {
              missionStatusDetailResponse: { startTime: string };
            }) => {
              const missionDate = new Date(
                status.missionStatusDetailResponse.startTime,
              ).toLocaleDateString();
              const today = new Date().toLocaleDateString();

              return missionDate === today;
            },
          )
          .map(
            (status: {
              missionStatusDetailResponse: {
                userDurationTime: number;
                endTime: string | null;
              };
            }) => {
              const { userDurationTime, endTime } =
                status.missionStatusDetailResponse;

              return {
                ...status,
                userDurationTime: endTime === null ? null : userDurationTime,
                isPassed: endTime === null ? true : false,
              };
            },
          )
          .sort(
            (a: { orders: number }, b: { orders: number }) =>
              a.orders - b.orders,
          );

        setTodayMissionStatus(missionStatus);
      }
    } catch (e) {
      console.error('getFinishedRoutineDetail: ', e);
    }
  };

  const getRoutineInfo = async () => {
    if (!routineId) return;
    try {
      const result = await routineApi.getRoutine(routineId);
      const routineInfo: RoutineInfoType = {
        emoji: result.data.data.emoji,
        name: result.data.data.name,
        durationGoalTime: result.data.data.durationGoalTime,
      };
      setRoutineInfo(routineInfo);
    } catch (e) {
      console.error('getRoutineInfo: ', e);
    }
  };

  const handleReviewSubmit = async (review: RoutineReviewType) => {
    if (!review.content) {
      Swal.fire({
        icon: 'error',
        text: '루틴 후기를 작성해주세요',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (review.routineStatusImage.length > 5) {
      Swal.fire({
        icon: 'error',
        text: '사진은 최대 5장까지 업로드가 가능합니다',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: '루틴 후기 등록에 성공했습니다!🎉',
      });

      const fileFormData = new FormData();
      const files = review.reviewImages.map(({ file }) => file);
      files.forEach((file) => {
        fileFormData.append('file', file);
      });
      const { routineStatusId, emotion, content, deletedImages } = review;
      const reviewDataBlob = new Blob(
        [JSON.stringify({ routineStatusId, emotion, content, deletedImages })],
        { type: 'application/json' },
      );
      fileFormData.append('routineStatusCreateRequest', reviewDataBlob);
      await routineApi.creatRoutineReview(fileFormData);
    }
  };

  const getInitReview = async () => {
    if (!routineId) return;
    const result = await routineApi.getRoutineStatus(routineId);
    console.log(result);
  };

  useEffect(() => {
    getFinishedRoutineDetail();
    getRoutineInfo();
    getInitReview();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Title>루틴 요약</Title>
      <RoutineInfo routineObject={routineInfo} />
      <RoutineProgressContainer>
        <StyledRoutineProgress>
          <RoutineProgress missionObject={todayMissionStatus} />
        </StyledRoutineProgress>
      </RoutineProgressContainer>
      <ButtonContainer>
        <Button colorType="white" onClick={() => history.push('/')}>
          종료하기
        </Button>
        <Button onClick={() => setVisible(true)}>후기 작성하기</Button>
      </ButtonContainer>
      <RoutineReviewModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleReviewSubmit}
        initReview={reviewInfo}
      />
    </Container>
  );
};

export default RoutineFinishPage;

const Title = styled.h1`
  margin: 1.5rem 0;
  @media ${Media.sm} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.large};
  }
  @media ${Media.lg} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.large};
  }
`;

const RoutineProgressContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.backgroundModal};
  border-radius: 16px;
  max-height: 700px;
  margin-top: 2rem;
  overflow-y: auto;
`;

const StyledRoutineProgress = styled.div`
  margin: 3rem 0;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  z-index: 1000;
  margin-top: 3rem;
  @media ${Media.sm} {
    width: 240px;
  }
  @media ${Media.md} {
    display: flex;
    width: 480px;
  }
  @media ${Media.lg} {
    display: flex;
    width: 480px;
  }
  > button {
    margin: 0 1rem 1rem 0;
  }
`;
