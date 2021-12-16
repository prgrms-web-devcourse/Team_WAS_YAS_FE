import { Route, Redirect, RouteProps } from 'react-router-dom';

const PrivateRoute = ({
  children,
  component: Component,
  ...rest
}: RouteProps & Required<Pick<RouteProps, 'component'>>): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
