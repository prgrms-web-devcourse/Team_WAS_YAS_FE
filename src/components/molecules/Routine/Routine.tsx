import React from 'react';
import Basic from './Basic';

export interface RoutineProps extends React.ComponentProps<'div'> {
  emoji?: string;
  color?: string;
  title?: string;
  totalTime?: string;
  startTime?: string;
}

const Routine = {
  Basic,
};

export default Routine;
