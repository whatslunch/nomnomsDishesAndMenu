// TESTS
// on click of close, updates state of App show to false

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


describe('FullMenuModal', () => {
  const dishes = [
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    },
    {
      description: "minima inventore possimus",
      id: 1458,
      name: 'est',
      price: 3.25,
      restaurant_id: 98,
      reviews: 80,
    }
  ];

  const exampleRestaurantName = 'eligendi';

  it('contains MainDiv', () => {
    const wrapper = mount(<Modal fullMenu={dishes} restaurantName={exampleRestaurantName} show={false} />);
    expect(wrapper.exists('MainDiv')).toBe(true);
    expect(wrapper.exists('.modal')).toBe(true);

  });

  // handleClose = { this.hideModal }
  // TESTS TO WRITE
  // check that all the rendered prices have two decimal points rendered
  // test if it receives props that it,
});

