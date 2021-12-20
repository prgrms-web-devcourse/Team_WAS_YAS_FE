import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

// TODO: RouteProps 임포트해서 사용하는 방식 해결하기
// eslint-disable-next-line
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
