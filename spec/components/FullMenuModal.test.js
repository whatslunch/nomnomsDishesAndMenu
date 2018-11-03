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
  const handleCloseMock = jest.fn();

  it('contains MainDiv and a modal class', () => {
    const wrapper = mount(<Modal fullMenu={dishes} restaurantName={exampleRestaurantName} show={false} handleClose={handleCloseMock} />);
    expect(wrapper.exists('MainDiv')).toBe(true);
    expect(wrapper.exists('.modal')).toBe(true);
  });

  it('calls handleClose method when Close Button is clicked', () => {
    const wrapper = mount(<Modal fullMenu={dishes} restaurantName={exampleRestaurantName} show={false} handleClose={handleCloseMock} />);
    wrapper.find('.closeButton').simulate('click');
    expect(handleCloseMock).toBeCalled();
  });

});

