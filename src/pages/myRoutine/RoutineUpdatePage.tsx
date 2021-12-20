import React, { FormEvent, useEffect, useState, useCallback } from 'react';
import { Container, DaySelector, Routine, Button } from '@/components';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import { RoutineType } from '@/Models';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
import { routineApi } from '@/apis';

const RoutineUpdatePage = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<Record<string, string>>();
  const [selectedRoutine, setSelectedRoutine] = useState<
    Omit<RoutineType, 'missionDetailResponse'>
  >({
    routineId: 0,
    emoji: '',
    color: '',
    name: '밥먹기',
    durationGoalTime: 0,
    startGoalTime: '',
    routineCategory: [],
    weeks: [],
  });
  const initialRoutine = useCallback(async () => {
    try {
      // 예외처리
      if (!id) return;
      const response = await routineApi.getRoutine(parseInt(id));
      const routineData = response.data.data;
      setSelectedRoutine(routineData);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '오류로 인해 루틴을 불러올 수 없습니다',
        confirmButtonColor: Colors.point,
      });
    }
  }, [id]);

  useEffect(() => {
    initialRoutine();
  }, [initialRoutine]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 예외처리
      if (!id) return;

      await routineApi.updateRoutine(parseInt(id), {
        weeks: selectedRoutine.weeks,
      });
      Swal.fire({
        icon: 'success',
        text: '루틴 수정이 완료되었습니다!🎉',
      }).then(() => {
        history.push('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '오류로 인해 루틴 수정에 실패했습니다',
        confirmButtonColor: Colors.point,
      });
    }
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
      text: '작성했던 모든 내용이 초기화됩니다!',
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
