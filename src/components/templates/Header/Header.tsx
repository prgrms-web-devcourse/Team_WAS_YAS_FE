import styled from '@emotion/styled';
import { useEffect, Children, isValidElement } from 'react';

export interface HeaderProps extends React.ComponentProps<'div'> {
  text?: string;
}

const Header = ({ children, ...props }: HeaderProps): JSX.Element => {
  const items = Children.toArray(children)
    .filter((element) => isValidElement(element))
    .slice(0, 3);

  useEffect(() => {
    if (Children.count(children) > 3) {
      console.warn(
        'Header component only accepts 3 children. The rest will be ignored.',
      );
    }
  }, [children]);

  return (
    <Container single={Children.count(children) === 1} {...props}>
      {items}
    </Container>
  );
};

const Container = styled.div<HeaderProps & { single: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${({ single }) => (single ? 'flex-end' : 'space-between')};
  align-items: flex-start;
  align-content: flex-end;
  height: 40px;
`;

export default Header;
