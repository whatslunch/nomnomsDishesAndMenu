import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-top-style: solid;
  border-top-width: thin;

  .menuItemCol{
    width: 80%;
    font-size: 12px;
    line-height: 1.5em;
  }

  .imgCol{
    width: 10%;
  }

  .priceCol{
    width: 10%;
    text-align: right;
    position: relative;
    top: 1%;
  }
`;

class MenuItem extends React.Component {
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
    $.ajax(`/menus/${this.props.restaurantName}/dishes/${this.props.menuItem.id}/photos`, {
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
    let priceWithZero;

    if (this.props.menuItem.price.toString().length === 3) {
      priceWithZero = '' + this.props.menuItem.price + '0';
    } else {
      priceWithZero = '' + this.props.menuItem.price;
    }
    return (
      <MainDiv>
        <div className="menuItemCol imgCol">image</div>
        <div className="menuItemCol">
          <div><b>{this.props.menuItem.name[0].toUpperCase() + this.props.menuItem.name.slice(1)}</b></div>
          <div>{this.props.menuItem.description[0].toUpperCase() + this.props.menuItem.description.slice(1) + '.'}</div>
          <div>icon {this.props.menuItem.reviews} reviews icon {this.state.numberOfPhotos} photos </div>
        </div>
        <div className="menuItemCol priceCol"><b>{'$' + priceWithZero}</b></div>
      </MainDiv>
    );
  }
}

export default MenuItem;