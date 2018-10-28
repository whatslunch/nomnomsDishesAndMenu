// this.props.dish is a dish object 

import React from 'react';
import $ from 'jquery';

class PopularDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPhotos: 0
    };
    this.getNumberOfPhotos = this.getNumberOfPhotos.bind(this);
  }

  getNumberOfPhotos() {
    $.ajax(`/menus/${this.props.restaurantName}/dishes/${this.props.dish.id}/photos`, {
      method: 'GET',
      success: (data) => {
        this.setState({ numberOfPhotos: data.length });
      },
      error: () => {
        console.log('error from getNumberOfPhotos ajax request');
      }
    });
  }

  componentDidMount() {
    this.getNumberOfPhotos();
  }


  render() {

    return (
      <div>
        <img src={this.props.dish.url} alt="picture of food" height='250' width='300'></img>
        <p><b>{this.props.dish.name}</b></p>
        <p>{this.state.numberOfPhotos} photos - {this.props.dish.reviews} reviews</p>
      </div>
    );
  }
}

export default PopularDish;