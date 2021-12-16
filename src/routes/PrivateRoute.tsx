/* eslint-disable */
import { Route, Redirect, RouteProps } from 'react-router-dom';
/* eslint-disable */
import Swal from 'sweetalert2';

const PrivateRoute = ({
  children,
  component: Component,
  ...rest
}: RouteProps & Required<Pick<RouteProps, 'component'>>): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  !token &&
    Swal.fire({
      icon: 'warning',
      title: '😆',
      text: '로그인을 해주세요.',
      showConfirmButton: false,
      timer: 2000,
    });

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/mypage/signin" />
      }
    />
  );
};

export default PrivateRoute;
