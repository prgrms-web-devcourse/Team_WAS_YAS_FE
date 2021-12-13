import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Routine, Button } from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const DUMMY_ROUTINE: {
  routineId: number;
  title: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  weeks: string[];
  routineCategories: string[];
  missions: MissionType[];
}[] = [
  {
    routineId: 0,
    emoji: '🌳',
    color: Colors.red,
    title: '집 앞 공원 산책하기',
    durationGoalTime: 10000,
    startGoalTime: `${new Date().toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 2,
    emoji: '🥽',
    color: Colors.brown,
    title: '물 2L 마시기',
    durationGoalTime: 780,
    startGoalTime: `${new Date(2021, 12, 8, 12, 0).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 3,
    emoji: '🍖',
    color: Colors.indigo,
    title: '아침 만들어 먹기',
    durationGoalTime: 4200,
    startGoalTime: `${new Date(2021, 12, 8, 6, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 4,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 5,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 6,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
  {
    routineId: 7,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },

  {
    routineId: 8,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    weeks: [],
    routineCategories: [],
    missions: [],
  },
];

const RoutinePostCreatePage = (): JSX.Element => {
  const history = useHistory();
  const [selectedRoutineId, setSelectedRoutineId] = useState<
    number | undefined
  >(undefined);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRoutineId === undefined) {
      Swal.fire({
        icon: 'error',
        title: '포스트할 루틴을 <p>선택해주세요!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '루틴 포스트에 <p>성공했습니다!',
      }).then(() => {
        history.push('/community');
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    setSelectedRoutineId(parseInt(e.target.value));
  };

  return (
    <Container>
      <Title>어떤 루틴을 포스트 할까요?</Title>
      <Form onSubmit={handleSubmit}>
        <RoutineGridBox>
          {DUMMY_ROUTINE.map((routine, i) => (
            <div key={i}>
              <Input
                name="routines"
                type="radio"
                id={String(routine.routineId)}
                value={routine.routineId}
                onChange={handleChange}
              />
              <label htmlFor={String(routine.routineId)}>
                <Routine routineObject={routine} type="create" />
              </label>
            </div>
          ))}
        </RoutineGridBox>
        <CreateButton colorType="white" type="submit">
          포스팅하기
        </CreateButton>
      </Form>
    </Container>
  );
};

export default RoutinePostCreatePage;

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

const RoutineGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 32px 56px;
  padding: 40px 0;

  @media ${Media.sm} {
    gap: 10px 14px;
    padding: 20px 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  display: none;
  :checked + label > div {
    border: 2px solid ${Colors.point};
    opacity: 0.5;
  }
`;

const CreateButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  z-index: 1000;
  @media ${Media.sm} {
    max-width: 150px;
  }
  @media ${Media.md} {
    max-width: 270px;
  }
  @media ${Media.lg} {
    max-width: 270px;
  }
`;
