import { Button, ButtonProps } from '@/components';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
};

export const Default = ({ ...args }: ButtonProps): JSX.Element => {
  return (
    <>
      <Button {...args}>회원가입 하러가기</Button>
      <Button buttonType={'white'} {...args} style={{ marginTop: '10px' }}>
        포스팅하기
      </Button>
    </>
  );
};
