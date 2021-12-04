import { Button } from '@/components';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    basicColor: {
      control: 'color',
    },
    hoverColor: {
      control: 'color',
    },
    activeColor: {
      control: 'color',
    },
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <Button.Main {...args}>회원가입 하러가기</Button.Main>
      <Button.Sub {...args} style={{ marginTop: '10px' }}>
        포스팅하기
      </Button.Sub>
    </>
  );
};
