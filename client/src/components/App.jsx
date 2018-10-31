import React from 'react';
import PopularDish from './PopularDish.jsx';
import initialDishData from '../initialData.js';
import axios from 'axios';
import styled from 'styled-components';

//*******STYLING *********************************/
const Title = styled.div`
  text-align: left;
  vertical-align: bottom;
  font-size: 21px;
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
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const PopularDishSpanHolder = styled.span`
  padding-right: 15px;
`;

//  doesn't seem to work when added below ... justify-content: flex-end;
const TitleMenuContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: fixed;
`;

const ScrollRight = styled.button`
  height: 20px;
  width: 30px;
  border: none;
  position: fixed;
  right: 15px;
  outline: none;
`;

const ScrollLeft = styled.button`
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

  scrollRight() {
    console.log('clicked scroll right!');
  }

  scrollLeft() {
    console.log('clicked scroll left!');
  }

  componentDidMount() {
    this.getDishes();
  }

  render() {

    return (
      <MainContainer id='main'>
        <TitleMenuContainer>
          <Title>Popular Dishes at {(this.state.restaurantName)[0].toUpperCase() + this.state.restaurantName.slice(1)}</Title>
          <FullMenu>Full Menu</FullMenu>
          <ScrollRight onClick={this.scrollRight}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollRight.png" alt="scroll right icon" width="100%" height="100%"></img></ScrollRight>
          <ScrollLeft onClick={this.scrollLeft}><img src="https://s3.us-east-2.amazonaws.com/yelpsfphotos/scrollLeft.png" alt="scroll left icon" width="100%" height="100%"></img></ScrollLeft>

        </TitleMenuContainer>

        <PopularDishesContainer>
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