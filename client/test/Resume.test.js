import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Resume from '../../client/src/components/Resume.jsx';

describe('A suite to test the Resume component', () => {

  it('Expect Resume.jsx to render without throwing an error', () => {
    expect(shallow(<Resume />).contains(<h4 className="card-title">Upload</h4>)).toBe(true);
  });
})


