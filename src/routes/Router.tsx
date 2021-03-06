import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import {
  MyRoutinePage,
  RoutineCreatePage,
  MissionCreatePage,
  RoutineDetailPage,
  RoutineFinishPage,
  RoutineProgressPage,
  RoutineCommunityPage,
  RoutinePostCreatePage,
  RoutinePostDetailPage,
  SignInPage,
  SignUpPage,
  UserEditPage,
  PasswordEditPage,
  UserPage,
  SocialSignInPage,
  AnalysisPage,
  NotFoundPage,
  OnBoardingPage,
  AnalysisDetailPage,
} from '@/pages';
import { RoutineUpdatePage } from '@/pages/myRoutine';
import RoutinePostWritePage from '@/pages/routineCommunity/RoutinePostWritePage';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <PublicRoute path="/" exact component={MyRoutinePage} />
      <PublicRoute path="/routine" exact component={MyRoutinePage} />
      <PrivateRoute
        path="/routine/create"
        exact
        component={RoutineCreatePage}
      />
      <PrivateRoute path="/routine/:id" exact component={RoutineDetailPage} />
      <PrivateRoute
        path="/routine/:id/update"
        exact
        component={RoutineUpdatePage}
      />
      <PrivateRoute
        path="/routine/:id/create"
        exact
        component={MissionCreatePage}
      />
      <PrivateRoute
        path="/routine/:id/progress"
        exact
        component={RoutineProgressPage}
      />
      <PrivateRoute
        path="/routine/:id/finish"
        exact
        component={RoutineFinishPage}
      />

      <PublicRoute path="/community" exact component={RoutineCommunityPage} />
      <PrivateRoute
        path="/community/create"
        exact
        component={RoutinePostCreatePage}
      />
      <PrivateRoute
        path="/community/:id/create"
        exact
        component={RoutinePostWritePage}
      />
      <PublicRoute
        path="/community/:id"
        exact
        component={RoutinePostDetailPage}
      />

      <PrivateRoute path="/mypage" exact component={UserPage} />
      <PrivateRoute path="/mypage/edit" exact component={UserEditPage} />
      <PrivateRoute
        path="/mypage/edit/password"
        exact
        component={PasswordEditPage}
      />
      <PublicRoute
        restricted
        path="/mypage/signin"
        exact
        component={SignInPage}
      />
      <PublicRoute
        restricted
        path="/mypage/signup"
        exact
        component={SignUpPage}
      />

      <PrivateRoute path="/analysis" exact component={AnalysisPage} />
      <PrivateRoute
        path="/analysis/detail/:id"
        exact
        component={AnalysisDetailPage}
      />

      <PublicRoute path="/onboarding" exact component={OnBoardingPage} />

      <PublicRoute path="/oauth/redirect" exact component={SocialSignInPage} />

      <PublicRoute path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
