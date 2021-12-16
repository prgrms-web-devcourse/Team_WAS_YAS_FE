/* eslint-disable */
import { Route, Redirect, RouteProps } from 'react-router-dom';
/* eslint-disable */

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...rest
}: RouteProps &
  Required<Pick<RouteProps, 'component'>> & {
    restricted?: boolean;
  }): JSX.Element => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

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
