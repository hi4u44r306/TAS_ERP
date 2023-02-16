import React from 'react';
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderImages } from '../../utils/images';
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Slider = () => {
  // const interval = 1500;
  return (
    <div className="hero-slider">
      <div className='hero-slider-item'>
        <img src={sliderImages[0]} alt="" />
        {/* <Carousel variant={null} controls={false} fade="true">
          <Carousel.Item interval={interval}>
            <img
              className="d-block w-100"
              src={sliderImages[0]}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="d-block w-100"
              src={sliderImages[1]}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="d-block w-100"
              src={sliderImages[2]}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel> */}
      </div>
    </div>
  )
}

export default Slider