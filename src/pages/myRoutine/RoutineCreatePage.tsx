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
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import moment from 'moment';
import { RoutineType } from '@/Models';
import Swal from 'sweetalert2';
import { ROUTINE_CATEGORY, WEEK } from '@/constants';
import { useHistory } from 'react-router-dom';
import { routineApi } from '@/apis';

const RoutineCreatePage = (): JSX.Element => {
  const history = useHistory();
  const [routine, setRoutine] = useState<
    Omit<RoutineType, 'routineId' | 'missionDetailResponse'>
  >({
    emoji: '💫',
    color: Colors.red,
    name: '',
    durationGoalTime: 0,
    startGoalTime: new Date().toISOString(),
    routineCategory: [],
    weeks: [],
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const defaultWeeks = Object.keys(WEEK);
    e.preventDefault();
    const { name, routineCategory } = routine;
    if (!name) {
      Swal.fire({
        icon: 'warning',
        title: '루틴 이름을 입력해주세요!',
      });
    } else if (!routineCategory?.length) {
      Swal.fire({
        icon: 'warning',
        title: '루틴 카테고리를 선택해주세요!',
      });
    } else {
      try {
        await routineApi.createRoutine({
          ...routine,
          weeks: routine.weeks.length !== 0 ? routine.weeks : defaultWeeks,
        });
        Swal.fire({
          icon: 'success',
          title: '루틴 생성이 완료되었습니다!🎉',
        }).then(() => {
          history.push('/');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '오류로 인해 <p>루틴 생성에 실패했습니다',
          confirmButtonColor: Colors.point,
        });
      }
    }
  };

  const handleEmojiChange = (emoji: string) => {
    setRoutine((routine) => ({ ...routine, emoji }));
  };
  const handleTitleChange = (
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

  const handleCategoryChange = (selectedCategories: string[]) => {
    setRoutine((routine) => ({
      ...routine,
      routineCategory: [...selectedCategories],
    }));
  };

  const handleColorChange = (selectedColor: string) => {
    setRoutine((routine) => ({
      ...routine,
      color: selectedColor,
    }));
  };

  const handleWeekChange = (selectedDays: string[]) => {
    console.log(selectedDays);
    setRoutine((routine) => ({
      ...routine,
      weeks: [...selectedDays],
    }));
  };

  const handleTimeChange = (time: any) => {
    setRoutine((routine) => ({
      ...routine,
      startGoalTime: moment(time).toISOString(),
    }));
  };

  const onCancelClick = () => {
    Swal.fire({
      icon: 'warning',
      title: '작성했던 모든 내용이 초기화됩니다!',
    }).then(() => {
      history.push('/');
    });
  };
  return (
    <Container style={{ paddingTop: '100px' }}>
      <Routine routineObject={routine} type="create" />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="emoji">이모지</Label>
        <EmojiPicker name="emoji" onEmojiClick={handleEmojiChange} />
        <Label htmlFor="name">루틴 이름</Label>
        <Input
          id="name"
          name="name"
          placeholder="루틴 이름을 입력해주세요"
          onChange={handleTitleChange}
        />
        {routine.name ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>루틴 이름을 입력해주세요</Span>
        )}
        <Label htmlFor="routineCategory">카테고리</Label>
        <StyledRoutineCategory>
          <RoutineCategorySelector
            selectedLimit={2}
            type="checkbox"
            name="routineCategory"
            onChange={handleCategoryChange}
            categories={Object.keys(ROUTINE_CATEGORY).slice(1)}
          />
        </StyledRoutineCategory>
        <Label htmlFor="color">색상</Label>
        <ColorPalette
          name="color"
          initialSelectedColor={routine.color}
          onChange={handleColorChange}
        />
        <Label htmlFor="weeks">요일</Label>
        <DaySelector name="weeks" onChange={handleWeekChange} />
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
  margin: 3rem 0 1.5rem 0;
  font-size: ${FontSize.medium};
  color: ${Colors.textSecondary};
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
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

const StyledStartTimePicker = styled.div`
  width: 100%;
  > div {
    width: 100%;
  }
`;

const Span = styled.span`
  margin-top: 1rem;
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
