import React, { FormEvent, useState } from 'react';
import { Container, DaySelector, Routine, Button } from '@/components';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import { RoutineType } from '@/Models';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const RoutineUpdatePage = (): JSX.Element => {
  const [selectedRoutine, setSelectedRoutine] = useState<Partial<RoutineType>>({
    routineId: 1,
    emoji: '🍿',
    color: Colors.red,
    title: '밥먹기',
    durationGoalTime: 1000,
    startGoalTime: new Date().toISOString(),
    routineCategories: ['FOOD'],
    weeks: ['MON', 'WED', 'FRI'],
    missions: [],
  });
  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: '루틴 수정이 완료되었습니다!🎉',
    }).then(() => {
      history.push('/');
    });
    console.log(selectedRoutine);
  };

  const handleWeekChange = (selectedDays: string[]) => {
    setSelectedRoutine((selectedRoutine) => ({
      ...selectedRoutine,
      weeks: [...selectedDays],
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
    <Container style={{ paddingTop: '56px' }}>
      <Routine
        routineObject={selectedRoutine}
        type="create"
        style={{ marginTop: '3rem' }}
      />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="weeks">요일</Label>
        <DaySelector
          name="weeks"
          initialSelectedDays={selectedRoutine.weeks}
          onChange={handleWeekChange}
        />
        <Span>루틴은 요일 수정만 가능합니다!</Span>
        <ButtonContainer>
          <Button type="button" colorType="white" onClick={onCancelClick}>
            취소하기
          </Button>
          <Button type="submit">수정하기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default RoutineUpdatePage;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem 0;
`;

const Label = styled.label`
  display: inline-block;
  margin: 2rem 0;
  font-size: ${FontSize.base};
  color: ${Colors.textSecondary};
`;

const Span = styled.span`
  margin-top: 2rem;
  color: ${Colors.functionNegative};
`;

const ButtonContainer = styled.div`
  margin-top: 5rem;
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
