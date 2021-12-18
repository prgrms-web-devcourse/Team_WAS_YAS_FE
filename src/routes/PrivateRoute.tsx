/* eslint-disable */
import { Route, Redirect, RouteProps } from 'react-router-dom';
/* eslint-disable */
import Swal from 'sweetalert2';

const PrivateRoute = ({
  children,
  component: Component,
  path,
  ...rest
}: RouteProps & Required<Pick<RouteProps, 'component'>>): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  if (!token && path !== '/mypage') {
    Swal.fire({
      icon: 'warning',
      title: '😆',
      text: '지금 당장 로그인을 하고 YAS를 시작해봐요!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/mypage/signin" />
      }
    />
  );
};

export default PrivateRoute;
