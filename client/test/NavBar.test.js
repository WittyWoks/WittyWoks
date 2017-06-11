import React from 'react';
import NavBar from '../../client/src/components/NavBar.jsx';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';


it('renders correctly', () => {
  const tree = renderer.create(
    <NavBar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('A suite to test the Resume component', () => {

  it('Expect NavBar.jsx to render without throwing an error', () => {
    expect(shallow(<NavBar />).contains(<a className="navbar-brand" href="/"><strong>BestFit</strong></a>)).toBe(true);
  });
});
