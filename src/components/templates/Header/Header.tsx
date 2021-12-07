import styled from '@emotion/styled';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { IconButton, IconButtonProps } from '@/components';

export type HeaderProps = React.ComponentProps<'header'>;

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const [match, history] = [useRouteMatch(), useHistory()];
  const params = parseParams(match.url);

  return (
    <Container {...props}>
      <BackButton visible={params.length > 1 && history.length > 1} />
      <IconButton.UserProfile />
    </Container>
  );
};

const parseParams = (path: string): string[] =>
  path.split('/').filter((param) => param);

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const BackButton = styled(IconButton.Back)<
  IconButtonProps & { visible: boolean }
>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

export default Header;
