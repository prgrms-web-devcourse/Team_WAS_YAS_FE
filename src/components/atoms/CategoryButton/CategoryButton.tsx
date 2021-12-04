import styled from '@emotion/styled';
import { colors, media, fontSize, fontWeight } from '@/styles';

type CategoryButtonProps = React.ComponentProps<'button'>;

const CategoryButton = ({
  children,
  ...props
}: CategoryButtonProps): JSX.Element => {
  return <CategoryButtonStyle {...props}>{children}</CategoryButtonStyle>;
};

export default CategoryButton;

const CategoryButtonStyle = styled.button`
  background-color: ${colors['background-menu']};
  color: ${colors['text-secondary']};
  border-radius: 32px;
  border: 1px solid ${colors['point-light']};
  cursor: pointer;
  font-weight: ${fontWeight.medium};
  @media ${media.sm} {
    min-width: 64px;
    min-height: 32px;
    font-size: ${fontSize.micro};
  }
  @media ${media.md} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${fontSize.base};
  }
  @media ${media.lg} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${fontSize.base};
  }
  :hover {
    background-color: ${colors.point};
    color: white;
  }
`;
