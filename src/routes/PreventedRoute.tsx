import { Route, Redirect, RouteProps } from 'react-router-dom';

const PreventedRoute = ({
  children,
  component: Component,
  ...rest
}: RouteProps & Required<Pick<RouteProps, 'component'>>): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PreventedRoute;
