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
      dishes: initialDishData
    }

    this.getDishes = this.getDishes.bind(this);

  }

  getDishes() {
    $.ajax(`/menus/${this.state.restaurantName}`, {
      method: 'GET',
      success: (data) => {
        // console.log('data from get ajax getDishes request>>>', data);
        this.setState({ dishes: data });
      },
      error: () => {
        console.log('error from getDishes ajax request');
      }
    });
  }

  // getArrOfTop10() {

  // }

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