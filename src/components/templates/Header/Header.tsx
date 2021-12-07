import styled from '@emotion/styled';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { IconButton, IconButtonProps } from '@/components';

export type HeaderProps = React.ComponentProps<'header'>;

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const [match, history] = [useRouteMatch(), useHistory()];
  const params = parseParams(match.url);

  return (
    <Container {...props}>
      <ContentContainer>
        <BackButton visible={params.length > 1 && history.length > 1} />
        <IconButton.UserProfile />
      </ContentContainer>
    </Container>
  );
};

const parseParams = (path: string): string[] =>
  path.split('/').filter((param) => param);

const Container = styled.header`
  position: fixed;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: white;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 768px;
  margin: 0 auto;
`;

const BackButton = styled(IconButton.Back)<
  IconButtonProps & { visible: boolean }
>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

export default Header;
