import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PopularDish from './components/PopularDish.jsx';
import initialDishData from '../src/initialData.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // when module gets hooked up to larger app, 
      // it should have functionality that updates the state restaurantName/id
      // on reload/componentDidMount, getDishes will be called to get the dishes for the given restaurant
      restaurantName: this.props.restaurantName,
      dishes: initialDishData,
      top10: initialDishData
    }
    this.getDishes = this.getDishes.bind(this);
  }

  getDishes() {
    $.ajax(`/menus/${this.state.restaurantName}`, {
      method: 'GET',
      success: (data) => {
        this.setState({ dishes: data });
        var top10 = this.getTop10(data);
        console.log('top10>>>', top10);
        this.setState({ top10: top10 });
      },
      error: () => {
        console.log('error from getDishes ajax request');
      }
    });
  }

  getTop10(dishes) {
    // returns an array of the top 10 dishesObjects ranked by # of reviews

    function compare(a, b) {
      const reviewsA = a.reviews;
      const reviewsB = b.reviews;

      let comparison = 0;
      if (reviewsA > reviewsB) {
        comparison = 1;
      } else if (reviewsA < reviewsB) {
        comparison = -1;
      }
      return comparison;
    }

    var sortedDishes = dishes.sort(compare).reverse();
    return sortedDishes.slice(0, 10);
  }

  componentDidMount() {
    this.getDishes();
  }

  render() {
    return (
      <div>
        <h2>Popular Dishes at {this.state.restaurantName}</h2>

        {this.state.top10.map((dishObj, index) => {
          return (
            <span id={index} className='popularDish'>
              <PopularDish restaurantName={this.state.restaurantName} dish={dishObj} />
            </span>
          );
        })}
      </div>
    )
  }
}


ReactDOM.render(<App restaurantName='saepe' />, document.getElementById('app'));


// populardish className -- for each box around the popular dish component -- should be the rounded border