import React from 'react';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: JSX.Element;
}

const Portal = ({ children }: PortalProps) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  });

  return createPortal(children, element);
};

export default Portal;
