import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PopularDish from './components/PopularDish.jsx';
import initialDishData from '../src/initialData.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: 'iusto',
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
      // Use toUpperCase() to ignore character casing
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
        <span>
          <PopularDish restaurantName={this.state.restaurantName} dish={this.state.dishes[0]} />
        </span>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));