import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Input, Mission, EmojiPicker, Button } from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import { DurationTimePicker } from '@/components/organisms/DurationTimePicker';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';

const MissionCreatePage = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<Record<string, string>>();
  const [mission, setMission] = useState<Partial<MissionType>>({
    title: '',
    emoji: '💫',
    color: Colors.red,
    durationGoalTime: 600,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, durationGoalTime } = mission;
    if (!title) {
      Swal.fire({
        icon: 'warning',
        title: '미션 이름을 입력해주세요!',
      });
    } else if (!durationGoalTime) {
      Swal.fire({
        icon: 'warning',
        title: '지속 시간을 입력해주세요!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '미션 생성이 <p>완료되었습니다~🎉',
      }).then(() => {
        history.push(`/routine/${id}`);
      });
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
      title: e.target.value,
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
      title: '작성했던 모든 내용이 초기화됩니다!',
    }).then(() => {
      history.push(`/routine/${id}`);
    });
  };

  return (
    <Container>
      <Mission
        type="create"
        missionObject={mission}
        style={{ marginTop: '6rem' }}
      />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="emoji">이모지</Label>
        <EmojiPicker name="emoji" onEmojiClick={handleEmojiChange} />
        <Label htmlFor="title">미션 이름</Label>
        <Input
          id="title"
          name="title"
          placeholder="미션 이름을 입력해주세요"
          onChange={handleTitleChange}
        />
        {mission.title ? '' : <Span>미션 이름을 입력해주세요</Span>}
        <Label htmlFor="durationGoalTime">지속 시간</Label>
        <StyledDurationTimePicker>
          <DurationTimePicker onChange={handleDurationTimeChange} />
        </StyledDurationTimePicker>
        {mission.durationGoalTime ? '' : <Span>지속 시간을 입력해주세요</Span>}
        <ButtonContainer>
          <Button type="button" colorType="white" onClick={onCancelClick}>
            취소하기
          </Button>
          <Button type="submit">생성하기</Button>
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
  width: 100%;
  margin-top: 3rem;
`;

const Label = styled.label`
  display: inline-block;
  margin: 3rem 0 1rem 0;
  font-size: ${FontSize.base};
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
  margin-top: 0.5rem;
  color: ${Colors.functionNegative};
`;

const StyledDurationTimePicker = styled.div`
  width: 100%;
  > div {
    width: 100%;
  }
`;
