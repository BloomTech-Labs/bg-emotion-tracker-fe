import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Authorization } from './components/common/Authorization';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import {
  UserContextProvider,
  AdminContextProvider,
  YouthContextProvider,
} from './state/contexts';

import 'antd/dist/antd.less';
import './styles/styles.less';

import { UnAuthorizedPage } from './components/pages/UnAuthorized';
import { NotFoundPage } from './components/pages/NotFound';
import { LoginPage } from './components/pages/Login';
import { Logout } from './components/common/Logout';
import { HomePage } from './components/pages/Home';
import { YDPDashboard } from './components/pages/YDPDashboard';
import { ClubDirectorDashboard } from './components/pages/ClubDirectorDashboard';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { LandingPage } from './components/pages/Landing';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import { ViewMembers } from './components/pages/Members';
import { ViewPrograms } from './components/pages/Programs';
import { ViewClubs } from './components/pages/Clubs';
import { MemberScanner } from './components/pages/MemberScanner';
import { Leaderboard } from './components/pages/Leaderboard';

import { ActivitySelect } from './components/pages/ActivitySelect';
import { EmojiSelectCheck } from './components/pages/EmojiSelectCheck';
import { EmojiSelectActivity } from './components/pages/EmojiSelectActivity';
import { EmojiConfirmRedirect } from './components/pages/EmojiConfirmRedirect';

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
      <AdminContextProvider>
        <YouthContextProvider>
          <div className="MainContainer">
            <Security {...config} onAuthRequired={authHandler}>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={Logout} />
                <Route path="/implicit/callback" component={LoginCallback} />
                <Route path="/landing" component={LandingPage} />

                {/* any of the routes you need secured should be registered as SecureRoutes */}
                <SecureRoute exact path="/" component={() => <HomePage />} />
                <SecureRoute
                  exact
                  path="/YDPDashboard"
                  component={() =>
                    Authorization([Roles[0], Roles[1], Roles[2]], YDPDashboard)
                  }
                />
                <SecureRoute
                  exact
                  path="/AdminDashboard"
                  component={() => Authorization([Roles[0]], AdminDashboard)}
                />
                <SecureRoute
                  exact
                  path="/ClubDirectorDashboard"
                  component={() =>
                    Authorization([Roles[0], Roles[1]], ClubDirectorDashboard)
                  }
                />

                <SecureRoute
                  path="/scanner"
                  component={() =>
                    Authorization([Roles[0], Roles[1], Roles[2]], MemberScanner)
                  }
                />

                <SecureRoute
                  exact
                  path="/club-select"
                  component={() =>
                    Authorization([Roles[0], Roles[1], Roles[2]], MemberScanner)
                  }
                />

                <SecureRoute
                  exact
                  path="/leaderboard"
                  component={() =>
                    Authorization([Roles[0], Roles[1], Roles[2]], Leaderboard)
                  }
                />

                <SecureRoute
                  exact
                  path="/activity-select"
                  component={() =>
                    Authorization(
                      [Roles[0], Roles[1], Roles[2]],
                      ActivitySelect
                    )
                  }
                />

                <SecureRoute
                  exact
                  path="/emoji-selectcheck"
                  component={() =>
                    Authorization(
                      [Roles[0], Roles[1], Roles[2]],
                      EmojiSelectCheck
                    )
                  }
                />

                <SecureRoute
                  exact
                  path="/emoji-selectactivity"
                  component={() =>
                    Authorization(
                      [Roles[0], Roles[1], Roles[2]],
                      EmojiSelectActivity
                    )
                  }
                />

                <SecureRoute
                  exact
                  path="/emoji-confirm-redirect"
                  component={() =>
                    Authorization(
                      [Roles[0], Roles[1], Roles[2]],
                      EmojiConfirmRedirect
                    )
                  }
                />
                <SecureRoute
                  path="/manage-members"
                  component={() =>
                    Authorization([Roles[0], Roles[1]], ViewMembers)
                  }
                />
                <SecureRoute
                  path="/manage-programs"
                  component={() =>
                    Authorization([Roles[0], Roles[1]], ViewPrograms)
                  }
                />
                <SecureRoute
                  path="/manage-clubs"
                  component={() =>
                    Authorization([Roles[0], Roles[1]], ViewClubs)
                  }
                />
                <Route path="/unauthorized" component={UnAuthorizedPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Security>
          </div>
        </YouthContextProvider>
      </AdminContextProvider>
    </UserContextProvider>
  );
}
