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

  return <Container>{items}</Container>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  height: 40px;
`;

export default Header;
