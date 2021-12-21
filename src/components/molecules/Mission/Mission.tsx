import { DeleteBox } from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import ToolBoxButtonIcon from '../Routine/ToolBoxButtonIcon';

interface MissionProps extends React.ComponentProps<'div'> {
  missionObject: Partial<MissionType>;
  type: 'normal' | 'create';
}

const Mission = ({
  missionObject,
  style,
  type,
  ...props
}: MissionProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const { emoji, name, durationGoalTime, color } = missionObject;
  const backgroundColor = color;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 0);

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  return (
    <MissionContainer style={{ backgroundColor, ...style }} {...props}>
      <Emoji>{emoji}</Emoji>
      <Title>{name}</Title>
      <Time>{durationTime}</Time>
      {type === 'normal' ? (
        <ToolBoxContainer onClick={() => setVisible(true)}>
          <ToolBoxButtonIcon />
          <DeleteBox
            style={{ transform: 'translate(-100px, -50px)', width: 110 }}
            visible={visible}
            onClose={handleCloseToolBox}
          />
        </ToolBoxContainer>
      ) : (
        <div />
      )}
    </MissionContainer>
  );
};

const MissionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 43rem;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  @media ${Media.sm} {
    height: 3.5rem;
    gap: 0.75rem;
  }
`;

const Emoji = styled.span`
  font-size: 2.25rem;
  text-align: center;
  width: 50px;

  @media ${Media.sm} {
    width: 24px;
    font-size: 1.25rem;
  }
`;

const Title = styled.span`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};
  color: ${Colors.textQuaternary};
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const Time = styled(Title)`
  flex-grow: 0;
`;

const ToolBoxContainer = styled.div`
  background-color: inherit;
  border: none;
  padding: 0.25rem 0.5rem 0 0.5rem;
  cursor: pointer;
`;

export type { MissionProps };
export default Mission;
