// eslint-disable-next-line
import { Icon } from '@/components';
// eslint-disable-next-line
// import { colors } from '@/styles';
// import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/Icon',
  component: Icon,
};

export const Default = () => {
  return (
    <>
      <Icon.User />
      <Icon.ArrowBack />
      <Icon.ArrowForward />
      <Icon.Close />
      <Icon.List />
      <Icon.LikeBorder />
      <Icon.Like />
      <Icon.AddPhoto />
    </>
  );
};
