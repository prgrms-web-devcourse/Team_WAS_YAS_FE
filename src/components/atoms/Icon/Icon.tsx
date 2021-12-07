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
import Community from './Community';
import Add from './Add';

export interface IconProps extends React.ComponentProps<'svg'> {
  color?: string;
  size?: number;
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
  Community,
  Add,
};

export default Icon;
