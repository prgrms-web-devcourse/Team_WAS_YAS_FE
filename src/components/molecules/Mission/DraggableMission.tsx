import { DeleteBox } from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import ToolBoxButtonIcon from '../Routine/ToolBoxButtonIcon';

interface MissionProps extends React.ComponentProps<'div'> {
  missionObject: Partial<MissionType>;
  type: 'normal' | 'create';
  index: number;
  moveMission: (dragIndex: number, hoverIndex: number) => void;
  deleteMission: () => void;
  updateMission: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface XYCoord {
  x: number;
  y: number;
}

const DraggableMission = ({
  missionObject,
  style,
  type,
  index,
  moveMission,
  deleteMission,
  updateMission,
  ...props
}: MissionProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const { missionId, emoji, name, durationGoalTime, color } = missionObject;
  const backgroundColor = color;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 0);
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'mission',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveMission(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop() {
      updateMission();
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'mission',
    item: () => {
      return { missionId, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    deleteMission && deleteMission();
  };

  return (
    <MissionContainer
      style={{ backgroundColor, opacity, ...style }}
      data-handle-id={handlerId}
      ref={ref}
      {...props}
    >
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
            onClickDeleteButton={handleClickDeleteButton}
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
    font-size: 1.25rem;
    width: 24px;
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

export default DraggableMission;
