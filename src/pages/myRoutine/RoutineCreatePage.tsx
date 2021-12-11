import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  ColorPalette,
  Container,
  DaySelector,
  Input,
  Routine,
  RoutineCategorySelector,
  Button,
  EmojiPicker,
  StartTimePicker,
} from '@/components';
import { Colors, FontSize } from '@/styles';
import styled from '@emotion/styled';
import moment from 'moment';
import { RoutineType } from '@/Models';
import Swal from 'sweetalert2';
import { ROUTINE_CATEGORY } from '@/constants';
import { useHistory } from 'react-router-dom';

const RoutineCreatePage = (): JSX.Element => {
  const history = useHistory();
  const [routine, setRoutine] = useState<RoutineType>({
    routineId: 0,
    emoji: '💫',
    color: Colors.red,
    title: '',
    durationGoalTime: 0,
    startGoalTime: new Date().toISOString(),
    routineCategories: [],
    weeks: [],
    missions: [],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, routineCategories } = routine;
    if (!title) {
      Swal.fire({
        icon: 'warning',
        title: '루틴 이름을 입력해주세요!',
      });
    } else if (!routineCategories.length) {
      Swal.fire({
        icon: 'warning',
        title: '루틴 카테고리를 선택해주세요!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '루틴 생성이 완료되었습니다!🎉',
      }).then(() => {
        history.goBack();
      });
    }
  };
  const handleEmojiChange = (emoji: string) => {
    setRoutine(() => ({ ...routine, emoji }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & {
      name: HTMLInputElement;
      value: HTMLInputElement;
    },
  ) => {
    const { name, value } = e.target;
    setRoutine({
      ...routine,
      [name]: value,
    });
  };

  const handleCategory = (selectedCategories: string[]) => {
    setRoutine({
      ...routine,
      routineCategories: [...selectedCategories],
    });
  };

  const handleWeek = (
    e: ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    const { weeks } = routine;
    const week = e.target.value;
    if (weeks) {
      if (!weeks.includes(week)) {
        setRoutine(() => ({
          ...routine,
          weeks: [...weeks, week],
        }));
      } else {
        const newWeek = weeks.filter((item) => item !== week);
        setRoutine(() => ({ ...routine, weeks: newWeek }));
      }
    }
  };

  const handleTimeChange = (time: any) => {
    setRoutine(() => ({
      ...routine,
      startGoalTime: moment(time).toISOString(),
    }));
  };

  const onCancelClick = () => {
    Swal.fire({
      icon: 'warning',
      title: '작성했던 모든 내용이 초기화됩니다!',
    }).then(() => {
      history.goBack();
    });
  };

  return (
    <Container>
      <Routine routineObject={routine} type="create" />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="emoji">이모지</Label>
        <EmojiPicker name="emoji" onEmojiClick={handleEmojiChange} />
        <Label htmlFor="title">루틴 이름</Label>
        <Input
          id="title"
          name="title"
          placeholder="루틴 이름을 입력해주세요"
          onChange={handleChange}
        />
        {routine.title ? '' : <Span>루틴 이름을 입력해주세요</Span>}
        <Label htmlFor="routineCategory">카테고리</Label>
        <StyledRoutineCategory>
          <RoutineCategorySelector
            selectedLimit={2}
            type="checkbox"
            name="routineCategory"
            onChange={handleCategory}
            categories={Object.values(ROUTINE_CATEGORY).slice(1)}
          />
        </StyledRoutineCategory>
        <Label htmlFor="color">색상</Label>
        <ColorPalette name="color" onChange={handleChange} />
        <Label htmlFor="weeks">요일</Label>
        <DaySelector name="weeks" onChange={handleWeek} />
        <Label htmlFor="startGoalTime">시작 시간</Label>
        <StyledStartTimePicker>
          <StartTimePicker
            name="startGoalTime"
            value={routine?.startGoalTime}
            onChange={handleTimeChange}
          />
        </StyledStartTimePicker>
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

export default RoutineCreatePage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  display: inline-block;
  margin: 1rem 0;
  font-size: ${FontSize.base};
  color: ${Colors.textSecondary};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  > button {
    margin-right: 1rem;
  }
`;

const StyledStartTimePicker = styled.div`
  width: 100%;
  > div {
    width: 100%;
  }
`;

const Span = styled.span`
  margin-top: 0.5rem;
  color: ${Colors.functionNegative};
`;
const StyledRoutineCategory = styled.div`
  > div {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;
    > label {
      margin-bottom: 0.5rem;
    }
  }
`;
