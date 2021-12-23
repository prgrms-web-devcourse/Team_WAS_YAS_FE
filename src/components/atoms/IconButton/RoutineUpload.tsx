import styled from '@emotion/styled';
import { Colors, Media, Shadow } from '@/styles';
import { IconButtonProps } from './IconButton';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

const RoutineUpload = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <Button {...props}>
      <UploadIcon />
    </Button>
  );
};

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: ${Colors.point};
  cursor: pointer;
  box-shadow: ${Shadow.button};

  @media ${Media.sm} {
    width: 42px;
    height: 42px;
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

const UploadIcon = styled(FileUploadRoundedIcon)`
  color: #ffffff;

  @media ${Media.sm} {
    width: 28px;
    height: 28px;
  }
  @media ${Media.md} {
    width: 40px;
    height: 40px;
  }
  @media ${Media.lg} {
    width: 40px;
    height: 40px;
  }
`;

export default RoutineUpload;
