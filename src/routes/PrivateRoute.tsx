import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

// TODO: RouteProps 임포트해서 사용하는 방식 해결하기
// eslint-disable-next-line
const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: any): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  if (!token && path !== '/mypage') {
    Swal.fire({
      icon: 'warning',
      text: '지금 당장 로그인을 하고 YAS를 시작해봐요!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props: any) =>
        token ? <Component {...props} /> : <Redirect to="/mypage/signin" />
      }
    />
  );
};

export default PrivateRoute;
