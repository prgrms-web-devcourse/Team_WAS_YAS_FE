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

  @media ${Media.sm} {
    border-radius: 12px;
    width: 32px;
    height: 32px;
  }
  @media ${Media.md} {
    border-radius: 1rem;
    width: 48px;
    height: 48px;
  }
  @media ${Media.lg} {
    border-radius: 1rem;
    width: 48px;
    height: 48px;
  }
`;

const TrashIcon = styled(DeleteRoundedIcon)`
  color: ${Colors.point};

  @media ${Media.sm} {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media ${Media.md} {
    width: 32px;
    height: 32px;
  }
  @media ${Media.lg} {
    width: 32px;
    height: 32px;
  }
`;

export default Delete;
