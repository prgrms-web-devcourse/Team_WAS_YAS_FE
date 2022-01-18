import { KakaoSignInButton, ButtonProps } from '@/components';

export default {
  title: 'Components/Atoms/KakaoSignInButton',
  component: KakaoSignInButton,
};

export const Default = ({ ...props }: ButtonProps): JSX.Element => (
  <KakaoSignInButton {...props} />
);
