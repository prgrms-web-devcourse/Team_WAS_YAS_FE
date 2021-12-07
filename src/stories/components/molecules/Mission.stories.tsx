import { useState } from 'react';
import { Mission } from '@/components';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Mission',
  component: Mission,
  argTypes: {},
};

export const Default = (): JSX.Element => {
  return <Mission emoji="🚿" title="샤워하기" time="30분" color={Colors.red} />;
};
