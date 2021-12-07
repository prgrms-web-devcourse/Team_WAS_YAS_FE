import { Colors } from '@/styles';
import RingLoader from 'react-spinners/RingLoader';

const Spinner = ({ ...props }): JSX.Element => {
  return <RingLoader color={Colors.yellow} {...props} />;
};

export default Spinner;
