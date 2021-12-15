import { WEEK } from '@/constants';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

export interface DayItemProps extends React.ComponentProps<'input'> {
  day: string;
}

const DayItem = ({ day, ...props }: DayItemProps): JSX.Element => {
  return (
    <>
      <StyledDayInput
        type="checkbox"
        id={day}
        name="day"
        value={day}
        {...props}
      />
      <label htmlFor={day}>
        <StyledDayItem>{WEEK[day]}</StyledDayItem>
      </label>
    </>
  );
};

export default DayItem;

const StyledDayInput = styled.input`
  display: none;
  :checked + label > div {
    color: ${Colors.textQuaternary};
    background-color: ${Colors.point};
  }
`;
const StyledDayItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${Colors.backgroundButton};
  color: ${Colors.textPrimary};
  font-weight: ${FontWeight.medium};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  @media ${Media.sm} {
    width: 32px;
    height: 32px;
    font-size: ${FontSize.micro};
  }
  @media ${Media.md} {
    width: 56px;
    height: 56px;
    font-size: ${FontSize.medium};
  }

  @media ${Media.lg} {
    width: 56px;
    height: 56px;
    font-size: ${FontSize.medium};
  }
  @media (hover: hover) {
    :hover {
      background-color: ${Colors.pointLight};
      color: ${Colors.textQuaternary};
    }
  }
`;
