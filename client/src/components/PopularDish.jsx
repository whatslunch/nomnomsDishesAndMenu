// this.props.dish is a dish object 

import React from 'react';
import $ from 'jquery';

class PopularDish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPhotos: 0,
      imgurl: '',
      imgCaption: ''
    };
    this.getPhotoData = this.getPhotoData.bind(this);
  }

  getPhotoData() {
    $.ajax(`/menus/${this.props.restaurantName}/dishes/${this.props.dish.id}/photos`, {
      method: 'GET',
      success: (data) => {
        // console.log('data>>>>', data);
        this.setState({ numberOfPhotos: data.length });
        // console.log('photos_id from first record>>>,', data[0].photos_id);
        $.ajax(`/photos/${data[0].photos_id}`, {
          success: (photoData) => {
            // console.log('photoData>>>', photoData);
            this.setState({ imgurl: photoData[0].url, impgCaption: photoData[0].caption });
          },
          error: () => {
            console.log('error from second ajax');
          }
        });
      },
      error: () => {
        console.log('error from getPhotoData 1st ajax request');
      }
    });
  }

  componentDidMount() {
    this.getPhotoData();
  }

  render() {

    return (
      <div>
        <img src={this.state.imgurl} alt="picture of food" height='250' width='300'></img>
        <p><b>{this.props.dish.name}</b></p>
        <p>{this.state.numberOfPhotos} photos - {this.props.dish.reviews} reviews</p>
      </div>
    );
  }
}

export default PopularDish;