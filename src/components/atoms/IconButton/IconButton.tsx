import styled from '@emotion/styled';
import React from 'react';
import List from './List';
import ArrowBack from './ArrowBack';
import ArrowForward from './ArrowForward';
import Close from './Close';
import UserProfile from './UserProfile';
import Check from './Check';
import Add from './Add';

export type IconButtonProps = Omit<React.ComponentProps<'button'>, 'children'>;

export const BaseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const IconButton = {
  ArrowBack,
  ArrowForward,
  Close,
  List,
  UserProfile,
  Check,
  Add,
};

export default IconButton;
