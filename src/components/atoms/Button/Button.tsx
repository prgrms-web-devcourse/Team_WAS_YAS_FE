import Main from './Main';
import Sub from './Sub';

export type ButtonProps = React.ComponentProps<'button'>;
export interface StyledButtonProps extends ButtonProps {
  basicColor?: string;
  hoverColor?: string;
  activeColor?: string;
}
const Button = {
  Main,
  Sub,
};

export default Button;
