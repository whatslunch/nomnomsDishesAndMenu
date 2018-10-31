import React from 'react';
import jest from 'jest';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import PopularDish from '../../client/src/components/PopularDish.jsx';
import { create } from "react-test-renderer";
const axios = require.requireMock('axios');

const $ = require.requireMock('jquery');

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
    expect(wrapper.instance().props.restaurantName).toBe('iure');
    expect(wrapper.instance().props.restaurantName).not.toBe('nulla');
  });

  // IN PROGRESS...
  // it('should on componentDidMount, fetch Dishes and update state.dishes', async () => {
  //   const resp = {
  //     data: [
  //       { id: 1454, restaurant_id: 97, name: "reprehenderit", price: 8.27, description: "quae corrupti et", reviews: 88 },
  //       { id: 1444, restaurant_id: 97, name: "qui", price: 6.81, description: "quae est ea", reviews: 85 },
  //       { id: 1445, restaurant_id: 97, name: "maxime", price: 5.43, description: "fuga nam quis", reviews: 82 },
  //       { id: 1449, restaurant_id: 97, name: "voluptatibus", price: 4.39, description: "dolore quasi recusandae", reviews: 81 },
  //       { id: 1441, restaurant_id: 97, name: "iusto", price: 6.98, description: "consequatur iure similique", reviews: 71 },
  //       { id: 1452, restaurant_id: 97, name: "vel", price: 3.66, description: "quam qui similique", reviews: 67 },
  //       { id: 1450, restaurant_id: 97, name: "culpa", price: 2.28, description: "itaque aut officia", reviews: 55 },
  //       { id: 1443, restaurant_id: 97, name: "repellendus", price: 6.23, description: "voluptatem veniam harum", reviews: 45 },
  //       { id: 1442, restaurant_id: 97, name: "eos", price: 3.2, description: "unde sequi dolor", reviews: 32 },
  //       { id: 1447, restaurant_id: 97, name: "accusamus", price: 3.17, description: "et laboriosam eos", reviews: 31 },
  //       { id: 1448, restaurant_id: 97, name: "similique", price: 3.89, description: "sunt dolor aperiam", reviews: 29 },
  //       { id: 1455, restaurant_id: 97, name: "necessitatibus", price: 4.98, description: "sunt aut sit", reviews: 16 },
  //       { id: 1446, restaurant_id: 97, name: "consequatur", price: 1.54, description: "necessitatibus at nulla", reviews: 9 },
  //       { id: 1453, restaurant_id: 97, name: "amet", price: 3.29, description: "asperiores natus dolor", reviews: 7 }
  //     ]
  //   };
  //   axios.get.mockResolvedValue(resp);
  //   const component = create(<App />);
  //   const instance = component.getInstance();
  //   await instance.componentDidMount();
  //   console.log(instance.state.dishes); // should return mocked data but does not!
  // });

});












