import * as React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import LoadingComponent from '../components/common/ChildLoadingComponent';
import MissionControlContainer from '../components/pages/MissionControl/MissionControlContainer';
import RenderMissionControl from '../components/pages/MissionControl/RenderMissionControl';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {},
    };
  },
}));
configure({ adapter: new Adapter() });

describe('<ParentDashboardContainer />', () => {
  configure({ adapter: new Adapter() });
  const mockStore = configureStore([]);
  const store = mockStore();

  describe('Render <ParentDashboardContainer />', () => {
    let shallowWrapper = ShallowWrapper;
    beforeEach(() => {
      shallowWrapper = shallow(
        <Router>
          <Provider store={store}>
            <MissionControlContainer />
          </Provider>
        </Router>
      );
    });
    it('Find ParentDashboard', () => {
      expect(shallowWrapper.find(RenderMissionControl).length).toBe(0);
    });
    it('Find Loading Component', () => {
      expect(shallowWrapper.find(LoadingComponent));
    });
  });
});
