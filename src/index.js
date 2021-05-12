import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { LoginPage } from './components/pages/Login';
import { Logout } from './components/common/Logout';
import { HomePage } from './components/pages/Home';
import { LandingPage } from './components/pages/Landing';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { ViewMembers } from './components/pages/Members';
import { ViewPrograms } from './components/pages/Programs';
import { ViewStaff } from './components/pages/Staff';
import { ViewClubs } from './components/pages/Clubs';
import { MemberScanner } from './components/pages/MemberScanner';
import { ClubSelect } from './components/pages/ClubSelect';
import { ActivitySelect } from './components/pages/ActivitySelect';
import { EmojiSelectCheck } from './components/pages/EmojiSelectCheck';
import { EmojiConfirmRedirect } from './components/pages/EmojiConfirmRedirect';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/landing" component={LandingPage} />

        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          exact
          path="/"
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        {/*Member scaner test*/}
        <SecureRoute
          exact
          path="/scanner"
          component={() => (
            <MemberScanner LoadingComponent={LoadingComponent} />
          )}
        />

        <SecureRoute
          exact
          path="/club-select"
          component={() => <ClubSelect LoadingComponent={LoadingComponent} />}
        />

        <SecureRoute
          exact
          path="/activity-select"
          component={() => (
            <ActivitySelect LoadingComponent={LoadingComponent} />
          )}
        />

        <SecureRoute
          exact
          path="/emoji-selectcheck"
          component={() => (
            <EmojiSelectCheck LoadingComponent={LoadingComponent} />
          )}
        />

        <SecureRoute
          exact
          path="/emoji-confirm-redirect"
          component={() => (
            <EmojiConfirmRedirect LoadingComponent={LoadingComponent} />
          )}
        />

        <SecureRoute path="/manage-members">
          <ViewMembers />
        </SecureRoute>
        <SecureRoute path="/manage-programs">
          <ViewPrograms />
        </SecureRoute>
        <SecureRoute path="/manage-staff">
          <ViewStaff />
        </SecureRoute>
        <SecureRoute path="/manage-clubs">
          <ViewClubs />
        </SecureRoute>
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
