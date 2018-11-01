// this.props.dish is a dish object 

import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 66%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-style: thin;
  border-color: transparent;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 34%;
  padding-left: 3%;
  vertical-align: center;
  font-family: arial;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .numPhotosReviews {
    color: #666666;
  }
  `;


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
      <MainDiv>
        <Image src={this.state.imgurl} alt="picture of food"></Image>
        <DetailWrapper>
          <b>{this.props.dish.name}</b>
          <div className='numPhotosReviews'>
            {this.state.numberOfPhotos} photos - {this.props.dish.reviews} reviews
          </div>
        </DetailWrapper>
      </MainDiv>
    );
  }
}

export default PopularDish;