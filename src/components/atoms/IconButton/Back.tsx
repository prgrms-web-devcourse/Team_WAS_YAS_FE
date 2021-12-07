import styled from '@emotion/styled';
import React from 'react';
import { IconButtonProps } from './IconButton';
import { Colors, Media, FontSize } from '@/styles';
import { useHistory } from 'react-router';

const Back = ({ onClick, ...props }: IconButtonProps): JSX.Element => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.goBack();
    onClick && onClick(e);
  };

  return (
    <StyledButton onClick={handleClick} {...props}>
      <StyledSvg
        width="9"
        height="17"
        viewBox="0 0 9 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.91978 16.7791C6.74548 16.7797 6.57327 16.7413 6.41579 16.6666C6.25832 16.5919 6.11958 16.4828 6.00978 16.3475L0.374778 9.34747C0.203182 9.13871 0.109375 8.87686 0.109375 8.60663C0.109375 8.3364 0.203182 8.07455 0.374778 7.8658L6.20811 0.865797C6.40614 0.627544 6.6907 0.477716 6.9992 0.449273C7.3077 0.42083 7.61486 0.516102 7.85311 0.71413C8.09136 0.912159 8.24119 1.19672 8.26963 1.50522C8.29808 1.81372 8.2028 2.12088 8.00478 2.35913L2.78978 8.61247L7.82978 14.8658C7.97244 15.0371 8.06306 15.2456 8.09092 15.4667C8.11878 15.6879 8.08271 15.9124 7.98698 16.1136C7.89125 16.3149 7.73986 16.4846 7.55073 16.6025C7.3616 16.7204 7.14265 16.7817 6.91978 16.7791Z"
          fill="#888888"
        />
      </StyledSvg>
      뒤로가기
    </StyledButton>
  );
};

const StyledSvg = styled.svg`
  margin-right: 0.5rem;

  @media ${Media.sm} {
    width: 6px;
    height: 12px;
  }
  @media ${Media.md} {
    width: 9px;
    height: 17px;
  }
  @media ${Media.lg} {
    width: 9px;
    height: 17px;
  }
`;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: ${FontSize.medium};

  &:hover {
    color: ${Colors.pointLight};

    & path {
      fill: ${Colors.pointLight};
    }
  }

  &:active {
    color: ${Colors.point};

    & path {
      fill: ${Colors.point};
    }
  }

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;

export default Back;
