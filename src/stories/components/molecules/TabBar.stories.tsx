import { TabBar, TabItemProps } from '@/components';

export default {
  title: 'Components/Molecules/TabBar',
  component: TabBar,
};

export const Default = ({ ...args }: TabItemProps): JSX.Element => {
  return (
    <TabBar {...args}>
      <TabBar.Item title="전체" index="0">
        <h1>전체 루틴</h1>
      </TabBar.Item>
      <TabBar.Item title="해야할 루틴" index="1">
        <h1>해야할 루틴</h1>
      </TabBar.Item>
      <TabBar.Item title="완료한 루틴" index="2">
        <h1>완료한 루틴</h1>
      </TabBar.Item>
    </TabBar>
  );
};
