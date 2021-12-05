import { RoundedButton } from '@/components';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface clickedNav {
  community: boolean;
  home: boolean;
  analysis: boolean;
}

interface NavBarProps {
  onClick?: (navName: string) => void;
}

const NavBar = ({ onClick }: NavBarProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState<Partial<clickedNav>>({
    community: false,
    home: false,
    analysis: false,
  });

  const clickHandler = (e: any): void => {
    const clickedNav = e.target.closest('button').className;
    let navName: string;

    if (clickedNav.includes('community')) {
      setIsClicked({
        community: true,
        home: false,
        analysis: false,
      });
      navName = 'community';
    } else if (clickedNav.includes('home')) {
      setIsClicked({
        community: false,
        home: true,
        analysis: false,
      });
      navName = 'home';
    } else if (clickedNav.includes('analysis')) {
      setIsClicked({
        community: false,
        home: false,
        analysis: true,
      });
      navName = 'analysis';
    } else {
      setIsClicked({
        community: false,
        home: false,
        analysis: false,
      });
      navName = 'not';
    }

    onClick && onClick(navName);
  };

  return (
    <NavBarContainer>
      <RoundedButton.Community
        className="community"
        onClick={clickHandler}
        active={isClicked.community}
      />
      <RoundedButton.Home
        className="home"
        onClick={clickHandler}
        active={isClicked.home}
      />
      <RoundedButton.Analysis
        className="analysis"
        onClick={clickHandler}
        active={isClicked.analysis}
      />
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 768px;

  @media ${Media.sm} {
    height: 56px;
  }
  @media ${Media.md} {
    height: 100px;
  }
  @media ${Media.lg} {
    height: 100px;
  }
`;

export type { NavBarProps };
export default NavBar;
