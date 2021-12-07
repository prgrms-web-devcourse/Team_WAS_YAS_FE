import { Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

interface MissionProps extends React.ComponentProps<'div'> {
  missionObject: {
    emoji: string;
    name: string;
    color: string;
    durationTime: string;
  };
}

const Mission = ({ missionObject, ...props }: MissionProps): JSX.Element => {
  const { emoji, name, durationTime: dt, color } = missionObject;
  const backgroundColor = color;
  return (
    <MissionContainer style={{ backgroundColor }} {...props}>
      <span>{emoji}</span>
      <span>{name}</span>
      <span>{name}</span>
    </MissionContainer>
  );
};

const MissionContainer = styled.div`
  height: 5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  max-width: 43rem;
  width: 100%;

  @media ${Media.sm} {
    height: 3.5rem;
  }
`;

const Emoji = styled.span``;

export type { MissionProps };
export default Mission;
