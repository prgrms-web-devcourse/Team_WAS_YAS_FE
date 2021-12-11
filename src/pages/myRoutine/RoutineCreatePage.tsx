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

const RoutineCreatePage = (): JSX.Element => {
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

  // const [errors, setErrors] = useState({ categories: '' });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(routine);
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

  // const [categories, setCategories] = useState<string[]>([]);
  const handleCategory = (
    e: ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    const category = e.target.value;
    const { routineCategories } = routine;
    const categoryInputs = document.querySelectorAll(
      'input[name=routineCategory]',
    );
    let checkedCategoryLength = 0;
    for (let i = 0; i < categoryInputs.length; i++) {
      if ((categoryInputs[i] as HTMLInputElement).checked) {
        checkedCategoryLength += 1;
        if (checkedCategoryLength > 2) {
          (categoryInputs[i] as HTMLInputElement).checked = false;
          // checkedCategoryLength -= 1;
          Swal.fire({
            icon: 'warning',
            title: '카테고리는 <p>최대 2개까지만 선택이 가능합니다',
          });
        }
      }
    }
    if (checkedCategoryLength <= 2) {
      if (!routineCategories.includes(category)) {
        setRoutine(() => ({
          ...routine,
          routineCategories: [...routineCategories, category],
        }));
      } else if (routineCategories.includes(category)) {
        const newCategories = routineCategories.filter(
          (item) => item !== category,
        );
        setRoutine(() => ({
          ...routine,
          routineCategories: newCategories,
        }));
      }
    }
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
        <Label htmlFor="routineCategory">카테고리</Label>
        <RoutineCategorySelector
          type="checkbox"
          name="routineCategory"
          onChange={handleCategory}
        />
        {/* {errors.categories ? <span>{errors.categories}</span> : ''} */}
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
          <Button colorType="white">취소하기</Button>
          <Button type="submit">생성하기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default RoutineCreatePage;

const Form = styled.form``;

const Label = styled.label`
  display: inline-block;
  margin: 0.5rem 0;
  font-size: ${FontSize.base};
  color: ${Colors.textSecondary};
`;

const ButtonContainer = styled.div`
  display: flex;
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
