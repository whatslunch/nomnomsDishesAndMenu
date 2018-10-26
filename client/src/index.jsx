import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantName: 'iusto',
      dishes: []
    }
    // this.getDishes = this.getDishes.bind(this);
  }

  // getDishes() {
  //   $.ajax(`/menus/${this.state.restaurantName}`, {
  //     method: 'GET',
  //     success: (data) => {
  //       this.setState({ dishes: data });
  //     },
  //     error: () => {
  //       console.log('error from getDishes ajax request');
  //     }
  //   });
  // }

  // getArrOfTop10() {

  // }

  // componentDidMount() {
  //   this.getDishes();
  // }


  render() {
    return (
      <div>
        <h2>Popular Dishes at {this.state.restaurantName}</h2>
        {/* {console.log('first dish obj=>>>>', this.state.dishes[0])} */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));