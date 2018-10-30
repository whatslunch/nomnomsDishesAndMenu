

import React from 'react';
import jest from 'jest';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import PopularDish from '../../client/src/components/PopularDish.jsx';

describe('App', () => {

  it('renders ten <PopularDish /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PopularDish)).toHaveLength(10);
  });

  it('has a span with the className popularDish', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.popularDish')).toBe(true);
    expect(wrapper.exists('.populardish')).toBe(false);
    expect(wrapper.find('.unpopularDish').exists()).toBe(false);
  });

  it('has a state property of dishes with a initial length of 10', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().dishes).toHaveLength(10);
    expect(wrapper.state('dishes')).toHaveLength(10);
  });

  it('has a state property of top10 with an initial length of 10', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().top10).toHaveLength(10);
    expect(wrapper.state('top10')).toHaveLength(10);
  });

  it('has a state property of restaurantName with value of the restaurantName property that is passed in', () => {
    const wrapper = shallow(<App restaurantName='nulla' />);
    expect(wrapper.state().restaurantName).toBe('nulla');
    expect(wrapper.state().restaurantName).not.toBe('iure');
  });

  it('should have a property with passed in value, when property and value are passed in', () => {
    const wrapper = shallow(<App restaurantName='iure' />);
    // console.log(wrapper.instance().props);
    expect(wrapper.instance().props.restaurantName).toBe('iure');
    expect(wrapper.instance().props.restaurantName).not.toBe('nulla');

  });

  // how to test length of dishes AFTER ajax/component did mount? should be 15
  // before test... run ajax line that returned mocked data?

  // test App's state after component did mount -- mock the function that gets run in component did mount?





  // ADDITIONAL TESTS TO WRITE...
  // test that App has a prop restaurantName that got passed down to it
  // write tests for populardish: should have a number of photos, a number of reviews, a photo rendering

  // once i add click functionality, could do a test like this.. remember to update to jest syntax
  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });


});







