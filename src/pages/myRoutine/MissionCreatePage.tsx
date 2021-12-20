import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Container,
  Input,
  Mission,
  EmojiPicker,
  Button,
  DurationTimePicker,
} from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
import { routineApi, missionApi } from '@/apis';

const MissionCreatePage = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<Record<string, string>>();
  const [mission, setMission] = useState<Omit<MissionType, 'missionId'>>({
    name: '',
    emoji: '💫',
    color: '',
    durationGoalTime: 600,
    orders: 0,
  });

  // TODO : 현재 루틴 컬러 및 미션 순서 스토어에서 가져오는 걸로 변경
  const getColorAndOrders = useCallback(async () => {
    // 예외처리
    if (!id) return;
    const response = await routineApi.getRoutine(parseInt(id));
    const { color, missionDetailResponses } = response.data.data;
    setMission((mission) => ({
      ...mission,
      color,
      orders: missionDetailResponses.length,
    }));
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, durationGoalTime } = mission;
    if (!name) {
      Swal.fire({
        icon: 'warning',
        text: '미션 이름을 입력해주세요!',
      });
    } else if (!durationGoalTime) {
      Swal.fire({
        icon: 'warning',
        text: '지속 시간을 입력해주세요!',
      });
    } else {
      try {
        // 예외처리
        if (!id) return;
        await missionApi.createMission(parseInt(id), mission);
        Swal.fire({
          icon: 'success',
          text: '미션 생성이 완료되었습니다~🎉',
        }).then(() => {
          history.goBack();
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: '오류로 인해 미션 생성에 실패했습니다',
          confirmButtonColor: Colors.point,
        });
      }
    }
  };
  const handleEmojiChange = (emoji: string) => {
    setMission((mission) => ({
      ...mission,
      emoji,
    }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMission((mission) => ({
      ...mission,
      name: e.target.value,
    }));
  };

  const handleDurationTimeChange = (durationGoalTime: number) => {
    setMission((mission) => ({
      ...mission,
      durationGoalTime,
    }));
  };

  const onCancelClick = () => {
    Swal.fire({
      icon: 'warning',
      text: '작성했던 모든 내용이 초기화됩니다!',
    }).then(() => {
      history.push(`/routine/${id}`);
    });
  };

  useEffect(() => {
    getColorAndOrders();
  }, [getColorAndOrders]);

  return (
    <Container>
      <Mission
        type="create"
        missionObject={mission}
        style={{ marginTop: '6.5rem', width: '90%' }}
      />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="emoji">이모지</Label>
        <EmojiPicker name="emoji" onEmojiClick={handleEmojiChange} />
        <Label htmlFor="title">미션 이름</Label>
        <Input
          id="name"
          name="name"
          placeholder="미션 이름을 입력해주세요"
          onChange={handleTitleChange}
        />
        {mission.name ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>미션 이름을 입력해주세요</Span>
        )}
        <Label htmlFor="durationGoalTime">지속 시간</Label>
        <StyledDurationTimePicker>
          <DurationTimePicker onChange={handleDurationTimeChange} />
        </StyledDurationTimePicker>
        {mission.durationGoalTime ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>지속 시간을 입력해주세요</Span>
        )}
        <ButtonContainer>
          <Button type="submit">생성하기</Button>
          <Button type="button" colorType="white" onClick={onCancelClick}>
            취소하기
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default MissionCreatePage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin-top: 3rem;
`;

const Label = styled.label`
  display: inline-block;
  margin: 3.5rem 0 1rem 0;
  font-size: ${FontSize.medium};
  color: ${Colors.textSecondary};
`;

const ButtonContainer = styled.div`
  margin-top: 6rem;
  @media ${Media.sm} {
    > button {
      width: 100%;
    }
  }
  @media ${Media.md} {
    display: flex;
  }
  @media ${Media.lg} {
    display: flex;
  }
  > button {
    margin: 0 1rem 1rem 0;
  }
`;

const Span = styled.span`
  margin-top: 1rem;
  color: ${Colors.functionNegative};
`;

const StyledDurationTimePicker = styled.div`
  width: 100%;
  > div {
    width: 100%;
  }
`;
