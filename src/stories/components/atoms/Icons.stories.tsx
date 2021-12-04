import { Icon } from '@/components';
import { Colors } from '@/styles';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/Icon',
  component: Icon,
};

export const Default = () => {
  return (
    <>
      <Icon.ArrowBack />
      <Icon.ArrowForward />
      <Icon.Close />
      <Icon.Delete />
      <Icon.Edit />
      <Icon.Like />
      <Icon.LikeBorder />
      <Icon.List />
      <Icon.UserProfile />
      <Icon.UserProfileImageUploader />
    </>
  );
};

export const ArrowBack = ({ ...props }) => <Icon.ArrowBack {...props} />;

ArrowBack.argTypes = {
  size: { control: { type: 'range', min: 16, max: 200 } },
  color: { control: 'color' },
};

const StyledArrowBackIcon = styled(Icon.ArrowBack)`
  size: 64px;
  color: red;
`;

export const Custom = () => {
  return <StyledArrowBackIcon />;
};
