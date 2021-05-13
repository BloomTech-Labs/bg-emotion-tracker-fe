import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { UserContextProvider } from './state/contexts';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { LoginPage } from './components/pages/Login';
import { Logout } from './components/common/Logout';
import { HomePage } from './components/pages/Home';
import { YDPDashboard } from './components/pages/YDPDashboard';
import { LandingPage } from './components/pages/Landing';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { ViewMembers } from './components/pages/Members';
import { ViewPrograms } from './components/pages/Programs';
import { ViewStaff } from './components/pages/Staff';
import { ViewClubs } from './components/pages/Clubs';
import { MemberScanner } from './components/pages/MemberScanner';
import { Roles } from './state/contexts/roles';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <UserContextProvider>
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
            component={() => (
              <HomePage
                authorize={[Roles[0], Roles[1]]}
                LoadingComponent={LoadingComponent}
              />
            )}
          />
          <SecureRoute
            exact
            path="/YDPDashboard"
            component={() => (
              <YDPDashboard authorize={[Roles[0], Roles[1], Roles[2]]} />
            )}
          />
          {/*Member scaner test*/}
          <SecureRoute
            exact
            path="/scanner"
            component={() => (
              <MemberScanner LoadingComponent={LoadingComponent} />
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
    </UserContextProvider>
  );
}
