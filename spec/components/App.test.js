

import React from 'react';
import jest from 'jest';
import { shallow } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import PopularDish from '../../client/src/components/PopularDish.jsx';

describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App />);
  });

  it('renders ten <PopularDish /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PopularDish)).toHaveLength(10);
  });


});







