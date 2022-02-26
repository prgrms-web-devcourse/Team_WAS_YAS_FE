import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { routineApi } from '@/apis';
import {
  Container,
  RoutineInfo,
  RoutineProgress,
  RoutineReview,
  RoutineReviewModal,
} from '@/components';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { RoutineReviewType, RoutineType } from '@/Models';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

const AnalysisDetailPage = (): JSX.Element => {
  const { id } = useParams<Record<string, string>>();
  const [routineInfo, setRoutineInfo] = useState<
    Pick<RoutineType, 'emoji' | 'name' | 'durationGoalTime'>
  >({ emoji: '', name: '', durationGoalTime: 0 });
  const [todayMissionStatus, setTodayMissionStatus] = useState<any>([]);
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
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<{
    year: number;
    month: number;
    day: number;
  }>({ year: 0, month: 0, day: 0 });

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
    Swal.fire({
      icon: 'question',
      text: '루틴 후기를 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: `${Colors.functionPositive}`,
      cancelButtonColor: `${Colors.functionNegative}`,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  const handleCloseClick = () => {
    setVisible(false);
    window.location.replace(`/analysis/detail/${id}`);
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

  const getRoutineStatus = useCallback(async () => {
    if (!id) return;
    try {
      const result = await routineApi.getRoutineStatus(parseInt(id));
      const { emoji, name, durationGoalTime } = result.data.data.routineDto;
      const missionStatus = result.data.data.missionDetailStatusResponses
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
          (a: { orders: number }, b: { orders: number }) => a.orders - b.orders,
        );
      setTodayMissionStatus(missionStatus);
      setRoutineInfo(() => ({
        emoji,
        name,
        durationGoalTime,
      }));
      const { emotion, startTime, content, routineStatusImage } =
        result.data.data;
      const date = new Date(startTime);
      setDate({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      });
      setReviewInfo((reviewInfo) => ({
        ...reviewInfo,
        routineStatusId: parseInt(id),
        emotion,
        content,
        routineStatusImage,
      }));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '오류로 인해 루틴 완료 데이터 로드에 실패했습니다.',
        confirmButtonColor: Colors.point,
      });
    }
  }, [id]);

  useEffect(() => {
    getRoutineStatus();
  }, [getRoutineStatus]);
  return (
    <Container>
      <Title>루틴 요약</Title>
      <DateText>
        {date.year}년 {date.month}월 {date.day}일
      </DateText>
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
    </Container>
  );
};

export default AnalysisDetailPage;

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

const DateText = styled.p`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  color: ${Colors.textTertiary};
  margin-bottom: 0.5rem;

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
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

const RoutineReviewContainer = styled.div`
  margin-top: 1.5rem;
  width: 85%;
`;
