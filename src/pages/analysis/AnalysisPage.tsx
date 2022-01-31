import React, { useCallback, useEffect, useState } from 'react';
import { Container, Calendar } from '@/components';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { routineStatusApi } from '@/apis';
import dayjs from 'dayjs';

type highlightDatesType = {
  [key: string]: number;
};

type routineStatusType = {
  dateTime: string;
};

const parseHighlightDates = (
  routineStatusData: routineStatusType[],
): highlightDatesType => {
  const highlightDates: highlightDatesType = {};
  routineStatusData.forEach((routineStatus: routineStatusType) => {
    const date = dayjs(routineStatus.dateTime).format('YYYY-MM-DD');
    highlightDates[date]
      ? (highlightDates[date] += 1)
      : (highlightDates[date] = 1);
  });
  return highlightDates;
};

const AnalysisPage = (): JSX.Element => {
  const [highlightDates, setHighlightDates] = useState<highlightDatesType>({});

  const handleClickDate = (date: dayjs.Dayjs) => {
    console.log('handleClickDate');
    // getRoutineStatusByDate(date);
  };

  const getRoutineStatusByDate = useCallback(async (date: string) => {
    try {
      const res = await routineStatusApi.getRoutineStatusByDate(date);
      const routineStatus = res.data.data;
      return routineStatus;
    } catch (error) {
      return [];
    }
  }, []);

  useEffect(() => {
    console.log('useEffect');

    const init = async () => {
      const today = dayjs().format('YYYY-MM');
      const routineStatusData = await getRoutineStatusByDate(today);
      const highlightDates = parseHighlightDates(routineStatusData);
      setHighlightDates(highlightDates);
      console.log(routineStatusData, highlightDates);
    };

    init();
  }, []);

  return (
    <Container navBar>
      <Calendar highlightDates={highlightDates} onClickDate={handleClickDate} />
    </Container>
  );
};

export default AnalysisPage;
