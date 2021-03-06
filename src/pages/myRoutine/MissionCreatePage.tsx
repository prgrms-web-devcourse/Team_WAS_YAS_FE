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
import { missionApi } from '@/apis';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutine, RootState } from '@/store';

const MissionCreatePage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<Record<string, string>>();
  const [mission, setMission] = useState<Omit<MissionType, 'missionId'>>({
    name: '',
    emoji: 'π«',
    color: '',
    durationGoalTime: 600,
    orders: 0,
  });

  const { data: routine } = useSelector((state: RootState) => state.routine);

  const getColorAndOrders = useCallback(async () => {
    if (!routine) return;
    const { color, missionDetailResponses } = routine;
    setMission((mission) => ({
      ...mission,
      color,
      orders: missionDetailResponses.length,
    }));
  }, [routine]);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchRoutine(parseInt(id)));
  }, [id, dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, durationGoalTime } = mission;
    if (!name) {
      Swal.fire({
        icon: 'warning',
        text: 'λ―Έμ μ΄λ¦μ μλ ₯ν΄μ£ΌμΈμ!',
      });
    } else if (!durationGoalTime) {
      Swal.fire({
        icon: 'warning',
        text: 'μ§μ μκ°μ μλ ₯ν΄μ£ΌμΈμ!',
      });
    } else {
      try {
        // μμΈμ²λ¦¬
        if (!id) return;
        await missionApi.createMission(parseInt(id), mission);
        Swal.fire({
          icon: 'success',
          text: 'λ―Έμ μμ±μ΄ μλ£λμμ΅λλ€~π',
        }).then(() => {
          history.goBack();
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'μ€λ₯λ‘ μΈν΄ λ―Έμ μμ±μ μ€ν¨νμ΅λλ€',
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
      text: 'μμ±νλ λͺ¨λ  λ΄μ©μ΄ μ΄κΈ°νλ©λλ€!',
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
        <Label htmlFor="emoji">μ΄λͺ¨μ§</Label>
        <EmojiPicker name="emoji" onEmojiClick={handleEmojiChange} />
        <Label htmlFor="title">λ―Έμ μ΄λ¦</Label>
        <Input
          id="name"
          name="name"
          placeholder="λ―Έμ μ΄λ¦μ μλ ₯ν΄μ£ΌμΈμ"
          onChange={handleTitleChange}
        />
        {mission.name ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>λ―Έμ μ΄λ¦μ μλ ₯ν΄μ£ΌμΈμ</Span>
        )}
        <Label htmlFor="durationGoalTime">μ§μ μκ°</Label>
        <StyledDurationTimePicker>
          <DurationTimePicker onChange={handleDurationTimeChange} />
        </StyledDurationTimePicker>
        {mission.durationGoalTime ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>μ§μ μκ°μ μλ ₯ν΄μ£ΌμΈμ</Span>
        )}
        <ButtonContainer>
          <Button type="submit">μμ±νκΈ°</Button>
          <Button type="button" colorType="white" onClick={onCancelClick}>
            μ·¨μνκΈ°
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
