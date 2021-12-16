/* eslint-disable */
import { Route, Redirect, RouteProps } from 'react-router-dom';
/* eslint-disable */
import Swal from 'sweetalert2';

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...rest
}: RouteProps &
  Required<Pick<RouteProps, 'component'>> & {
    restricted?: boolean;
  }): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  token &&
    restricted &&
    Swal.fire({
      icon: 'warning',
      title: '🤯',
      text: '잘못된 접근입니다.',
      showConfirmButton: false,
      timer: 1500,
    });

  return (
    <Route
      {...rest}
      render={(props) =>
        token && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
