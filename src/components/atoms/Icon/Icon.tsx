import styled from '@emotion/styled';
import ArrowBack from './ArrowBack';
import ArrowForward from './ArrowForward';
import Close from './Close';
import Delete from './Delete';
import Edit from './Edit';
import Like from './Like';
import LikeBorder from './LikeBorder';
import List from './List';
import UserProfile from './UserProfile';
import UserProfileImageUploader from './UserProfileImageUploader';

export interface StyledSvgProps extends React.ComponentProps<'svg'> {
  size?: number;
}

export const StyledSvg = styled.svg<StyledSvgProps>`
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
`;

export interface IconProps extends React.ComponentProps<'svg'> {
  size?: number;
  color?: string;
}

const Icon = {
  ArrowBack,
  ArrowForward,
  Close,
  Delete,
  Edit,
  Like,
  LikeBorder,
  List,
  UserProfile,
  UserProfileImageUploader,
};

export default Icon;
