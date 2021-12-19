import { IconButtonProps } from './IconButton';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';

const Add = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <StyledButton {...props}>
      <StyledSvg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.4016 24.0001C38.4016 25.3273 38.2864 26.4001 36.9592 26.4001H26.4016V36.9577C26.4016 38.2825 25.3288 38.4001 24.0016 38.4001C22.6744 38.4001 21.6016 38.2825 21.6016 36.9577V26.4001H11.044C9.71916 26.4001 9.60156 25.3273 9.60156 24.0001C9.60156 22.6729 9.71916 21.6001 11.044 21.6001H21.6016V11.0425C21.6016 9.7153 22.6744 9.6001 24.0016 9.6001C25.3288 9.6001 26.4016 9.7153 26.4016 11.0425V21.6001H36.9592C38.2864 21.6001 38.4016 22.6729 38.4016 24.0001Z"
          fill="#FFFFFF"
        />
      </StyledSvg>
    </StyledButton>
  );
};

export default Add;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;
  background-color: ${Colors.point};
  cursor: pointer;

  @media ${Media.sm} {
    width: 56px;
    height: 56px;
  }
  @media ${Media.md} {
    width: 64px;
    height: 64px;
  }
  @media ${Media.lg} {
    width: 64px;
    height: 64px;
  }

  &:hover {
    background-color: ${Colors.pointLight};
  }

  &:active {
    background-color: ${Colors.point};
  }
`;

const StyledSvg = styled.svg`
  @media ${Media.sm} {
    width: 40px;
    height: 40px;
  }
  @media ${Media.md} {
    width: 48px;
    height: 48px;
  }
  @media ${Media.lg} {
    width: 48px;
    height: 48px;
  }
`;
