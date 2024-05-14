import React from "react";
import Slider from "react-slick";
import LandingPageCard from "../../reusables/landingPageCard";
import { useSelector } from "react-redux";
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";

function CategoryCarousal() {
  const { allCategoriesAndSubcategories } = useSelector(
    (state) => state.products
  );
  console.log(allCategoriesAndSubcategories)

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
         <div className="w-40 h-40 bg-blue-400">1</div>
         <div className="w-40 h-40 bg-blue-400">1</div>

         <div className="w-40 h-40 bg-blue-400">1</div>

         <div className="w-40 h-40 bg-blue-400">1</div>

      </Slider>
    </div>
  );
}

export default CategoryCarousal;
