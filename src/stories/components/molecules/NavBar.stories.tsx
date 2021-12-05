import { NavBar } from '@/components/molecules/NavBar';
import { useState } from 'react';

export default {
  title: 'Components/Molecules/NavBar',
  component: NavBar,
};

export const Default = (): JSX.Element => {
  const [clickedNav, setClickedNav] = useState<string>('');
  const onClick = (navName: string): void => {
    setClickedNav(navName);
  };
  return (
    <>
      <NavBar onClick={onClick} />
      <div>{clickedNav}</div>
    </>
  );
};
