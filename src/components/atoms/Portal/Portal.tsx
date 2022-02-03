import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: JSX.Element;
}

const Portal = ({ children }: PortalProps): JSX.Element => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return createPortal(children, element);
};

export default Portal;
