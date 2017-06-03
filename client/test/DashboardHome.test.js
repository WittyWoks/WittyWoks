import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DashboardHome from '../../client/src/components/DashboardHome.jsx';
// import {List, ListItem} from 'material-ui/List';

describe('A suite to test the DashboardHome component', () => {

  test('DashboardHome should load with an empty jobs array', () => {
    const dashboardHome = shallow(
      <DashboardHome />
    );

    expect(dashboardHome.state().jobs).toEqual([]);
  })

  
})



