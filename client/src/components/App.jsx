import React from 'react';
import PopularDish from './PopularDish.jsx';
import initialDishData from '../initialData.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // when module gets hooked up to larger app, 
      // it should have functionality that updates the state restaurantName/id
      // on reload/componentDidMount, getDishes will be called to get the dishes for the given restaurant
      // currently passin gin restaurant name where App Component is "called"/rendered to the DOM
      restaurantName: this.props.restaurantName,
      dishes: initialDishData,
      top10: initialDishData
    };
    this.getDishes = this.getDishes.bind(this);
  }

  getDishes() {

    axios.get(`/menus/${this.state.restaurantName}`)
      .then(data => {
        // console.log('data line 40>>>', data.data);
        this.setState({ dishes: data.data });
        var top10 = this.getTop10(data.data);
        // console.log('top10>>>', top10);
        this.setState({ top10: top10 });
      })

  }

  getTop10(dishes) {
    // returns an array of the top 10 dishesObjects ranked by # of reviews

    var compare = (a, b) => {
      const reviewsA = a.reviews;
      const reviewsB = b.reviews;

      let comparison = 0;
      if (reviewsA > reviewsB) {
        comparison = 1;
      } else if (reviewsA < reviewsB) {
        comparison = -1;
      }
      return comparison;
    };

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

        {this.state.top10.map((dishObj) => (
          <span key={dishObj.id} className='popularDish'>
            <PopularDish restaurantName={this.state.restaurantName} dish={dishObj} />
          </span>)
        )}
      </div>
    );
  }
}
export default App;