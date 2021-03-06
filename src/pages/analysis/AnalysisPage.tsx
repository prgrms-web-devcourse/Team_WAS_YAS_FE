import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Media, Colors, FontSize } from '@/styles';
import { routineStatusApi } from '@/apis';
import { Container, Calendar, Routine, Spinner } from '@/components';
import { useHistory } from 'react-router-dom';
import { RoutineStatusType } from 'Models';

interface highlightDatesType {
  [key: string]: number;
}

const AnalysisPage = (): JSX.Element => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightDates, setHighlightDates] = useState<highlightDatesType>({});
  const [routineStatuses, setRoutineStatuses] = useState<RoutineStatusType[]>(
    [],
  );

  const getRoutineStatusByDate = async (
    date: string,
  ): Promise<RoutineStatusType[]> => {
    try {
      const res = await routineStatusApi.getRoutineStatusByDate(date);
      const routineStatus = res.data.data;
      return routineStatus;
    } catch (error) {
      return [];
    }
  };

  const parseHighlightDates = (
    routineStatusData: RoutineStatusType[],
  ): highlightDatesType => {
    const highlightDates: highlightDatesType = {};

    routineStatusData.forEach((routineStatus: RoutineStatusType) => {
      const date = dayjs(routineStatus.startTime).format('YYYY-MM-DD');
      highlightDates[date]
        ? (highlightDates[date] += 1)
        : (highlightDates[date] = 1);
    });

    return highlightDates;
  };

  const handleClickDate = async (date: dayjs.Dayjs) => {
    setLoading(true);
    const dateString = date.format('YYYY-MM-DD');
    const routineStatuses = await getRoutineStatusByDate(dateString);
    setRoutineStatuses(routineStatuses);
    setLoading(false);
  };

  const handleChangeYearMonth = async (yearMonth: dayjs.Dayjs) => {
    setLoading(true);
    const yearMonthString = yearMonth.format('YYYY-MM');
    const routineStatuses = await getRoutineStatusByDate(yearMonthString);
    const highlightDates = parseHighlightDates(routineStatuses);
    setHighlightDates(highlightDates);
    setLoading(false);
  };

  const handleClickRoutine = (routineStatusId: number) => {
    history.push(`/analysis/detail/${routineStatusId}`);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const now = dayjs();
      const yearMonth = now.format('YYYY-MM');
      const todayDate = now.format('YYYY-MM-DD');
      const yearMonthRoutineStatuses = await getRoutineStatusByDate(yearMonth);
      const todayDateRoutineStatuses = await getRoutineStatusByDate(todayDate);
      const highlightDates = parseHighlightDates(yearMonthRoutineStatuses);
      setHighlightDates(highlightDates);
      setRoutineStatuses(todayDateRoutineStatuses);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <Container navBar>
      <StyledCalendar
        highlightDates={highlightDates}
        onClickDate={handleClickDate}
        onChangeYearMonth={handleChangeYearMonth}
      />
      {routineStatuses.length <= 0 ? (
        <InfoContainer>
          <EmojiText>????</EmojiText>
          <Text>?????? ???????????? ????????? ????????? ????????????.</Text>
        </InfoContainer>
      ) : (
        <RoutineStatusContainer>
          {routineStatuses.map((routineStatus) => {
            const routine = routineStatus.routineListResponse;
            return (
              <Routine
                key={routine.routineId}
                type="create"
                routineObject={routine}
                onClick={() =>
                  handleClickRoutine(routineStatus.routineStatusId)
                }
              />
            );
          })}
        </RoutineStatusContainer>
      )}
      {loading && <Spinner />}
    </Container>
  );
};

const StyledCalendar = styled(Calendar)`
  margin-top: 1rem;
  min-height: 510px;
`;

const RoutineStatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 40px 0;
  width: 100%;
  margin-bottom: 6rem;
  padding: 40px 0;

  @media ${Media.sm} {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 14px;
    padding: 20px 0;

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0 6rem;
  align-items: center;
  width: 100%;
`;

const EmojiText = styled.p`
  font-size: 40px;
  margin: 2rem 0;
`;

const Text = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.medium};
`;

export default AnalysisPage;
