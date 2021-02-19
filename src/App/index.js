import React, {Component, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader';
import Aux from '../hoc/_Aux';
import ScrollToTop from './layout/ScrollToTop';
import routes from '../route';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader/root';
import {NavigateActions} from '../actions';
import {RouteConstants} from '../constants';
import {TokenUtil} from '../utility';
import {ConnectedRouter} from 'connected-react-router/immutable';

const AdminLayout = Loadable({
  loader: () => import('./layout/AdminLayout'),
  loading: Loader
});

class App extends Component {

  componentDidMount() {
    /**
     * Check that the current route matches the component.
     * Since we do not have a 404 catch all route page, we render the home component if the route does not exist but...
     * - the route will still have what the user initially tried to get to so we update it via NavigateActions.
     */

    const isKnownPath = () => {
      const routeValues = Object.values(RouteConstants);

      if (
        (routeValues.indexOf(this.props.path) !== -1 &&
        routeValues.indexOf('/auth/signin-1?next=/') === -1) ||
        (this.props.path.indexOf(RouteConstants.CALLBACK) !== -1) ||
        (this.props.path.indexOf(RouteConstants.RESET_PASSWORD) !== -1 && TokenUtil.checkUrlLength(this.props.path))
      ) {
        return true;
      }
    };

    if (!isKnownPath() || this.props.path === RouteConstants.ROOT) {
      // Change the browser navigation to root.
      this.props.noValidPathRedirect();
    }
  }

  render() {
    const menu = routes.map((route, index) => {
      return (route.component) ? (
        <Route
          key={ index }
          path={ route.path }
          exact={ route.exact }
          name={ route.name }
          render={ (props) => (
            <route.component { ...props } />
          ) } />
      ) : (null);
    });

    return (
    <ConnectedRouter history={ this.props.history }>
      <Aux>
        <ScrollToTop>
          <Suspense fallback={ <Loader/> }>
            <Switch>
              {menu}
              <Route path='/' component={ AdminLayout } />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    </ConnectedRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    path: state.getIn(['router', 'location', 'pathname']),
    isLoggedIn: state.getIn(['profiles', 'isLoggedIn']),
    peerplaysAccountName: state.getIn(['profiles','currentAccount','peerplaysAccountName'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    noValidPathRedirect: NavigateActions.noValidPathRedirect
  },
  dispatch
);

export default hot(
  connect(mapStateToProps, mapDispatchToProps)(App)
);