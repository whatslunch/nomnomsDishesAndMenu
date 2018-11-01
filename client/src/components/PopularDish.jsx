// this.props.dish is a dish object 

import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const MainDiv = styled.div`
display: flex;
flex-direction: column;
`;

const ImageWrapper = styled.div`
  height: 66%;
  position: relative;
  z-index: 0;
`;

const Price = styled.div`
  color: white;
  font-weight: bold;
  font-size: 13px;
  background: rgba(20, 20, 20, 0.75);
  font-family: arial;
  width: 23%;
  text-align: center;
  padding: 3px;
  position: absolute;
  right: 3%;
  bottom: 5%;
  z-index: 5;
  border-radius: 3px;
  `;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-style: thin;
  border-color: transparent;
  position: relative;
  z-index: 1;
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
  font-size: 16px;

  .numPhotosReviews {
    color: #666666;
    font-size: 14px;
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
        <ImageWrapper>
          <Image src={this.state.imgurl} alt="picture of food"></Image>
          <Price>{'$' + this.props.dish.price}</Price>
        </ImageWrapper>
        <DetailWrapper>
          <b>{this.props.dish.name[0].toUpperCase() + this.props.dish.name.slice(1)}</b>
          <div className='numPhotosReviews'>
            {this.state.numberOfPhotos} photos {"\u00B7"} {this.props.dish.reviews} reviews
          </div>
        </DetailWrapper>
      </MainDiv>
    );
  }
}

export default PopularDish;