import styled from '@emotion/styled';
import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Colors, Media } from '@/styles';

const Delete = ({ ...props }: React.ComponentProps<'button'>): JSX.Element => {
  return (
    <IconButton {...props}>
      <TrashIcon />
    </IconButton>
  );
};

const IconButton = styled.button`
  display: inline-block;
  background-color: ${Colors.backgroundButton};
  border: none;
  cursor: pointer;

  border-radius: 12px;
  width: 40px;
  height: 40px;
`;

const TrashIcon = styled(DeleteRoundedIcon)`
  width: 24px;
  height: 24px;
  color: ${Colors.point};
`;

export default Delete;
