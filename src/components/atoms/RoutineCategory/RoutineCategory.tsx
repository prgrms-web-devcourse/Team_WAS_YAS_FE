import styled from '@emotion/styled';
import { Colors, FontWeight, FontSize, Media } from '@/styles';

export type RoutineCategoryProps = React.ComponentProps<'button'>;

const RoutineCategory = ({
  children,
  ...props
}: RoutineCategoryProps): JSX.Element => {
  return <StyledRoutineCategory {...props}>{children}</StyledRoutineCategory>;
};

export default RoutineCategory;

const StyledRoutineCategory = styled.button`
  background-color: ${Colors.backgroundButton};
  color: ${Colors.textSecondary};
  border-radius: 32px;
  height: 40px;
  border: 1px solid ${Colors.pointLight};
  font-weight: ${FontWeight.medium};
  @media ${Media.sm} {
    min-width: 64px;
    min-height: 32px;
    font-size: ${FontSize.micro};
  }
  @media ${Media.md} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${FontSize.base};
  }
`;
