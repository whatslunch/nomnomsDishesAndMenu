import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import PopularDish from '../../client/src/components/PopularDish.jsx';
import Modal from '../../client/src/components/FullMenuModal.jsx';
import { create } from "react-test-renderer";
const axios = require.requireMock('axios');
import jest from 'jest-mock';
import PropTypes from 'prop-types';


describe('PopularDish', () => {
  const exampleDish = {
    description: "minima inventore possimus",
    id: 1458,
    name: 'est',
    price: 3.25,
    restaurant_id: 98,
    reviews: 80,
  };
  const exampleRestaurantName = 'eligendi';

  it('contains MainDiv, ImageWrapper, DetailWrapper, Image and Price elements', () => {
    const wrapper = mount(<PopularDish dish={exampleDish} restaurantName={exampleRestaurantName} />);
    expect(wrapper.exists('MainDiv')).toBe(true);
    expect(wrapper.exists('ImageWrapper')).toBe(true);
    expect(wrapper.exists('Price')).toBe(true);
    expect(wrapper.exists('Image')).toBe(true);
    expect(wrapper.exists('DetailWrapper')).toBe(true);

  });

  // TESTS TO WRITE
  // check that all the rendered prices have two decimal points rendered
  // test if it receives props that it,
});
