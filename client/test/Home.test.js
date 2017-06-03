import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '../../client/src/components/Home.jsx';

describe('A suite to test the Home component', () => {
  it('Expect Home.jsx to render without throwing an error', () => {
    expect(shallow(<Home />).contains(<h1 className="display-1">BestFit</h1>)).toBe(true);
  });


})


