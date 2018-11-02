import React from 'react';
import PopularDish from './PopularDish.jsx';
import Modal from './FullMenuModal.jsx';
import initialDishData from '../initialData.js';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

//*******STYLING *********************************/
const Title = styled.div`
  text-align: left;
  padding-left: 10px;
  vertical-align: bottom;
  font-size: 18px;
  color: #d32323;
  font-family: verdana;
  font-weight: bold;
`;

const FullMenu = styled.div`
  font-family: arial;
  font-size: 14px;
  color: #0073bb;
  vertical-align: bottom;
  position: fixed;
  right: 75px;
`;

const MainContainer = styled.div`
  padding-left: 30px;
`;

const PopularDishesContainer = styled.div`
  padding-top: 30px;
  vertical-align: middle;
  display: inline-block;
  width: 98%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {display:none;}

  `;
// align-items: flex-start;

const PopularDishSpanHolder = styled.div`
  height: 175px;
  width: 175px;
  margin: 10px;
  display: inline-block;
  border-style: solid;
  border-radius: 5px;
  border-color: #999999;
  border-width: .5px;
`;

//  doesn't seem to work when added below ... justify-content: flex-end;
const TitleMenuContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: fixed;
`;

const LeftArrow = styled.button`
  height: 20px;
  width: 30px;
  border: none;
  position: fixed;
  right: 15px;
  outline: none;
`;

const RightArrow = styled.button`
  height: 20px;
  width: 30px;
  border: none;
  position: fixed;
  right: 40px;
  outline: none;
`;

//********************************************** */


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
      top10: initialDishData,
      show: false
    };
    this.getDishes = this.getDishes.bind(this);
    this.scroll = this.scroll.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  // * methods for styling ////////////////////////////////////
  scroll(direction) {
    let far = $('.popDishesContainer').width() / 2 * direction;
    let pos = $('.popDishesContainer').scrollLeft() + far;
    $('.popDishesContainer').animate({ scrollLeft: pos }, 350)
  }

  showModal() {
    this.setState({ show: true });
    console.log('clicked showModal!');
  };

  hideModal() {
    this.setState({ show: false });
    console.log('clicked hide modal');
  };
  // *  /////////////////////////////////////////////////////

  componentDidMount() {
    this.getDishes();
  }

  render() {

    if (this.state.show) {
      return (
        <MainContainer id='main'>
          <TitleMenuContainer>
            <Title>Popular Dishes</Title>
            <FullMenu onClick={this.showModal}>Full Menu</FullMenu>
            <RightArrow onClick={this.scroll.bind(null, -1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollLeft.png" alt="scroll right icon" width="100%" height="100%"></img></RightArrow>
            <LeftArrow onClick={this.scroll.bind(null, 1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollRight.png" alt="scroll left icon" width="100%" height="100%"></img></LeftArrow>
          </TitleMenuContainer>

          <PopularDishesContainer className='popDishesContainer'>
            {this.state.top10.map((dishObj) => (
              <PopularDishSpanHolder key={dishObj.id} id={dishObj.id} className='popularDishSpan'>
                <PopularDish restaurantName={this.state.restaurantName} dish={dishObj} />
              </PopularDishSpanHolder>)
            )}
          </PopularDishesContainer>

          <Modal show={this.state.show} handleClose={this.hideModal} restaurantName={this.state.restaurantName} fullMenu={this.state.dishes} />

        </MainContainer>
      );
    }
    return (
      <MainContainer id="main">
        <TitleMenuContainer>
          <Title>Popular Dishes</Title>
          <FullMenu onClick={this.showModal}>Full Menu</FullMenu>
          <RightArrow onClick={this.scroll.bind(null, -1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollLeft.png" alt="scroll right icon" width="100%" height="100%"></img></RightArrow>
          <LeftArrow onClick={this.scroll.bind(null, 1)}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollRight.png" alt="scroll left icon" width="100%" height="100%"></img></LeftArrow>
        </TitleMenuContainer>

        <PopularDishesContainer className='popDishesContainer'>
          {this.state.top10.map((dishObj) => (
            <PopularDishSpanHolder key={dishObj.id} id={dishObj.id} className='popularDishSpan'>
              <PopularDish restaurantName={this.state.restaurantName} dish={dishObj} />
            </PopularDishSpanHolder>)
          )}
        </PopularDishesContainer>

      </MainContainer>
    );

  }
}
export default App;