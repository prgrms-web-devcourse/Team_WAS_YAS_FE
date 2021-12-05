import styled from '@emotion/styled';
import { Colors, FontWeight, FontSize, Media } from '@/styles';

export type CategoryButtonProps = React.ComponentProps<'button'>;

const CategoryButton = ({
  children,
  ...props
}: CategoryButtonProps): JSX.Element => {
  return <CategoryButtonStyle {...props}>{children}</CategoryButtonStyle>;
};

export default CategoryButton;

const CategoryButtonStyle = styled.button`
  background-color: ${Colors.backgroundButton};
  color: ${Colors.textSecondary};
  border-radius: 32px;
  border: 1px solid ${Colors.pointLight};
  cursor: pointer;
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
  :hover {
    background-color: ${Colors.point};
    color: ${Colors.textQuaternary};
  }
`;
