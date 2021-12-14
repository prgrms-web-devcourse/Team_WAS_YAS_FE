import { SpreadToggle, SpreadToggleProps } from '@/components';

export default {
  title: 'Components/Molecules/SpreadToggle',
  component: SpreadToggle,
};

export const Default = ({ ...args }: SpreadToggleProps) => {
  return <SpreadToggle open />;
};
