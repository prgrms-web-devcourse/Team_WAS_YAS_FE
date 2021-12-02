import React from 'react';

type DivProps = React.ComponentProps<'div'>;

const Container = ({ children, ...props }: DivProps) => {
  return <div {...props}>{children}</div>;
};

export default Container;
