import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...rest
}: any): JSX.Element => {
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
      render={(props: any) =>
        token && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
