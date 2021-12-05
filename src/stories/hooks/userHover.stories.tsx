import styled from '@emotion/styled';
import useHover from '../../hooks/useHover';

export default {
  title: 'Hook/useHover',
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: royalblue;
`;

export const Default = (): JSX.Element => {
  const [ref, hover] = useHover<HTMLDivElement>();

  return (
    <>
      <Box ref={ref} />
      {hover ? <div>TooTip!</div> : null}
    </>
  );
};
