import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Fake from './testJunk/Fake.jsx';

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Fake />).contains([
      <div>Hello From Fake</div>,
      <h1 className="baz">Another Test</h1>,
      <span>Span test</span>
    ])).toBe(true);
  });

  it('should be selectable by class "test"', () => {
    expect(shallow(<Fake />).is('.test')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Fake />).find('.dash').length).toBe(0);
    expect(mount(<Fake />).find('.test').length).toBe(1);
    expect(mount(<Fake />).find('.baz').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<Fake />).text()).toEqual('Hello From FakeAnother TestSpan test');
  });

  test('Fake changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(
      <Fake labelOn="On" labelOff="Off" />
    );

    expect(checkbox.find('.check').text()).toEqual('Off');

    checkbox.find('input').simulate('change');

    expect(checkbox.find('.check').text()).toEqual('On');
  });

});
