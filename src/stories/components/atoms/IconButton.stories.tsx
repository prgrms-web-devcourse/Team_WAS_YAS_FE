import IconButton from '@/components/atoms/IconButton';

export default {
  title: 'Components/Atoms/IconButton',
  component: IconButton,
};

export const Default = (): JSX.Element => {
  return (
    <>
      <IconButton.Play />
      <IconButton.RoutineUpdate />
      <IconButton.Add />
    </>
  );
};
