import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantId: 0,
      menuItems: [],
      top10MostPopular: []
    }
    this.getMenuItems = this.getMenuItems.bind(this);
    this.updateTop10 = this.updateTop10.bind(this);
  }

  getMenuItems() {
    $.ajax('/popular_dishes/:restaurant-name', {
      success: (data) => {
        this.setState({ menuItems: data });
      }
    });
  }

  updateTop10() {
    // every time we add an item to the menu items, would need to invoke this to make sure we have the most recent top10
  }

  componentDidMount() {
    this.getMenuItems();
  }


  render() {
    return (
      <div>
        The app will go here.
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));