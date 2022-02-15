import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  RoutineInfo,
  RoutineProgress,
  RoutineReview,
  Spinner,
} from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { missionStatusApi, routineApi } from '@/apis';
import Swal from 'sweetalert2';
import { RoutineReviewModal } from '@/components/organisms/RoutineReviewModal';
import { RoutineReviewType } from '@/Models';
import { v4 } from 'uuid';

interface RoutineInfoType {
  emoji: string;
  name: string;
  durationGoalTime: number;
}

const RoutineFinishPage = (): JSX.Element => {
  const history = useHistory();
  const params = useParams();
  const currentRoutineId = params['id'] && +params['id'];
  const [todayMissionStatus, setTodayMissionStatus] = useState<any>([]);
  const [routineInfo, setRoutineInfo] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const initialReview = {
    routineStatusId: 0,
    emotion: 1,
    content: '',
    routineStatusImage: [],
    deletedImages: [],
    reviewImages: [],
  };
  const [reviewInfo, setReviewInfo] =
    useState<RoutineReviewType>(initialReview);
  const getFinishedRoutineDetail = async () => {
    setLoading(true);
    if (!currentRoutineId) {
      setLoading(false);
      return;
    }
    try {
      const notFinishedRoutines = await routineApi.getNotFinishedRoutines();
      const notFinishedRoutineIds = notFinishedRoutines.data.data.map(
        (routine: { routineId: number }) => routine.routineId,
      );

      if (notFinishedRoutineIds.includes(currentRoutineId)) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '루틴을 수행하지 않았네요!',
          text: '해당 루틴페이지로 이동합니다',
          showConfirmButton: false,
          timer: 2000,
        });
        history.replace(`/routine/${currentRoutineId}`);
      } else {
        const result = await missionStatusApi.getMissionStatus(
          currentRoutineId,
        );
        const { routineStatusId } = result.data.data[0];
        setReviewInfo((reviewInfo) => ({ ...reviewInfo, routineStatusId }));
        const missionStatus = result.data.data
          .map(
            (status: {
              missionStatusDetailResponse: {
                userDurationTime: number;
                startTime: string | null;
                endTime: string | null;
              };
            }) => {
              const { userDurationTime, endTime, startTime } =
                status.missionStatusDetailResponse;

              return {
                ...status,
                userDurationTime: endTime === null ? null : userDurationTime,
                isPassed: endTime === null || startTime === null ? true : false,
              };
            },
          )
          .sort(
            (a: { orders: number }, b: { orders: number }) =>
              a.orders - b.orders,
          );
        getInitReview(routineStatusId);
        setTodayMissionStatus(missionStatus);
      }
    } catch (e) {
      console.error('getFinishedRoutineDetail: ', e);
    }
    setLoading(false);
  };

  const handleEmotionChange = (emotion: number) => {
    setReviewInfo((reviewInfo) => ({
      ...reviewInfo,
      emotion,
    }));
  };
  const handleContentChange = (content: string) => {
    setReviewInfo((reviewInfo) => ({
      ...reviewInfo,
      content,
    }));
  };

  const handleImageChange = (fileList: File[]) => {
    if (fileList) {
      fileList.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const id = v4();
          const newUrl = {
            routineStatusImageId: id,
            imageUrl: fileReader.result as string,
          };
          const newFile = {
            routineStatusImageId: id,
            file,
          };
          setReviewInfo((reviewInfo) => ({
            ...reviewInfo,
            routineStatusImage: [...reviewInfo.routineStatusImage, newUrl],
            reviewImages: [...reviewInfo.reviewImages, newFile],
          }));
        };
      });
    }
  };

  const handleImageDelete = (routineStatusImageId: number | string) => {
    if (typeof routineStatusImageId === 'number') {
      setReviewInfo((reviewInfo) => ({
        ...reviewInfo,
        deletedImages: [...reviewInfo.deletedImages, routineStatusImageId],
      }));
    }
    const newUrlList = reviewInfo.routineStatusImage.filter(
      (image) => image.routineStatusImageId !== routineStatusImageId,
    );
    const newFileList = reviewInfo.reviewImages.filter(
      (image) => image.routineStatusImageId !== routineStatusImageId,
    );
    setReviewInfo((reviewInfo) => ({
      ...reviewInfo,
      reviewImages: newFileList,
      routineStatusImage: newUrlList,
    }));
  };

  const handleReviewDelete = async () => {
    const fileFormData = new FormData();
    const { routineStatusId, routineStatusImage } = reviewInfo;
    const deletedImages = routineStatusImage.map(
      (image) => image.routineStatusImageId,
    );
    const reviewDataBlob = new Blob(
      [
        JSON.stringify({
          routineStatusId,
          emotion: 1,
          content: '',
          deletedImages,
        }),
      ],
      { type: 'application/json' },
    );
    fileFormData.append('routineStatusCreateRequest', reviewDataBlob);
    try {
      await routineApi.creatRoutineReview(fileFormData);
      Swal.fire({
        icon: 'success',
        text: '루틴 후기가 삭제 되었습니다!',
      });
      setReviewInfo(initialReview);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '오류로 인해 루틴 후기 삭제에 실패했습니다!',
      });
    }
  };

  const handleCloseClick = () => {
    setVisible(false);
    window.location.replace(`/routine/${currentRoutineId}/finish`);
  };

  const getRoutineInfo = async () => {
    setLoading(true);
    if (!currentRoutineId) {
      setLoading(false);
      return;
    }
    try {
      const result = await routineApi.getRoutine(currentRoutineId);
      const routineInfo: RoutineInfoType = {
        emoji: result.data.data.emoji,
        name: result.data.data.name,
        durationGoalTime: result.data.data.durationGoalTime,
      };
      setRoutineInfo(routineInfo);
    } catch (e) {
      console.error('getRoutineInfo: ', e);
    }
    setLoading(false);
  };

  const handleReviewSubmit = async () => {
    if (!reviewInfo.content) {
      Swal.fire({
        icon: 'error',
        text: '루틴 후기를 작성해주세요',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (reviewInfo.routineStatusImage.length > 5) {
      Swal.fire({
        icon: 'error',
        text: '사진은 최대 5장까지 업로드가 가능합니다',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      const fileFormData = new FormData();
      const files = reviewInfo.reviewImages.map(({ file }) => file);
      files.forEach((file) => {
        fileFormData.append('file', file);
      });
      const { routineStatusId, emotion, content, deletedImages } = reviewInfo;
      const reviewDataBlob = new Blob(
        [JSON.stringify({ routineStatusId, emotion, content, deletedImages })],
        { type: 'application/json' },
      );
      fileFormData.append('routineStatusCreateRequest', reviewDataBlob);
      try {
        await routineApi.creatRoutineReview(fileFormData);
        Swal.fire({
          icon: 'success',
          text: '루틴 후기 등록에 성공했습니다!🎉',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: '오류로 인해 루틴 후기 등록에 실패했습니다!',
        });
      }
    }
  };

  const getInitReview = async (routineStatusId: number) => {
    try {
      const result = await routineApi.getRoutineStatus(routineStatusId);
      const { emotion, content, routineStatusImage } = result.data.data;
      setReviewInfo((reviewInfo) => ({
        ...reviewInfo,
        emotion,
        content,
        routineStatusImage,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFinishedRoutineDetail();
    getRoutineInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Title>루틴 요약</Title>
      <RoutineInfo routineObject={routineInfo} />
      <RoutineReviewContainer>
        <RoutineReview
          reviewData={reviewInfo}
          onClickWriteReview={() => setVisible(true)}
          updateReview={() => setVisible(true)}
          deleteReview={handleReviewDelete}
        />
      </RoutineReviewContainer>
      <RoutineProgressContainer>
        <StyledRoutineProgress>
          <RoutineProgress missionObject={todayMissionStatus} />
        </StyledRoutineProgress>
      </RoutineProgressContainer>
      <ButtonContainer>
        <Button colorType="white" onClick={() => history.push('/')}>
          종료하기
        </Button>
      </ButtonContainer>
      {visible && (
        <RoutineReviewModal
          visible={visible}
          onClose={handleCloseClick}
          onSubmit={handleReviewSubmit}
          onEmotionChange={handleEmotionChange}
          onContentChange={handleContentChange}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
          initReview={reviewInfo}
        />
      )}
      {loading && <Spinner />}
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

const RoutineReviewContainer = styled.div`
  margin-top: 1.5rem;
  width: 85%;
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
  bottom: 1.5rem;
  z-index: 1000;
  margin-top: 3rem;
  @media ${Media.sm} {
    width: 240px;
  }
  @media ${Media.md} {
    width: 480px;
  }
  @media ${Media.lg} {
    width: 480px;
  }
`;
