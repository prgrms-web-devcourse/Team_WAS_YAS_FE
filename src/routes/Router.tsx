import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
  UserPage,
  AnalysisPage,
  NotFoundPage,
} from '@/pages';

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={MyRoutinePage} />
      <Route path="/routine" exact component={MyRoutinePage} />
      <Route path="/routine/create" exact component={RoutineCreatePage} />
      <Route path="/routine/detail/:id" exact component={RoutineDetailPage} />
      <Route
        path="/routine/detail/:id/create"
        exact
        component={MissionCreatePage}
      />
      <Route
        path="/routine/detail/:id/progress"
        exact
        component={RoutineProgressPage}
      />
      <Route
        path="/routine/detail/:id/finish"
        exact
        component={RoutineFinishPage}
      />

      <Route path="/community" exact component={RoutineCommunityPage} />
      <Route path="/community/create" exact component={RoutinePostCreatePage} />
      <Route
        path="/community/detail/:id"
        exact
        component={RoutinePostDetailPage}
      />

      <Route path="/signin" exact component={SignInPage} />
      <Route path="/signup" exact component={SignUpPage} />
      <Route path="/mypage" exact component={UserPage} />
      <Route path="/mypage/edit" exact component={UserEditPage} />

      <Route path="/analysis" exact component={AnalysisPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
