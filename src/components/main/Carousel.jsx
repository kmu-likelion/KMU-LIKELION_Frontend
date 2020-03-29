import React from "react";
import Swiper from "react-id-swiper";
// import logo from "./logo.png";
import slide1 from "./slide/slide1.jpg";
import slide2 from "./slide/slide2.jpg";
import slide3 from "./slide/slide3.jpg";
import slide4 from "./slide/slide4.jpg";
import slide5 from "./slide/slide5.jpg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  // swiperSlide: {
  //   margin: 30,
  //   textAlign: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "center"
  // },
  slideImg: {
    width: "auto",
    height: "auto"
  }
});

const Carousel = () => {
  const params = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  };

  // const renderContent = img => {
  //   console.log(img);
  //   return (
  //     <div
  //       className="swiper"
  //       style={{
  //         backgroundImage: `url(${img})`
  //       }}
  //     />
  //   );
  // };

  // const images = [slide1, slide2, slide3, slide4, slide5];
  // const classes = useStyles();
  return (
    <Swiper {...params}>
      {/* <div className={classes.swiperSlide}>
        <img
          className={classes.slideImg}
          src="http://lorempixel.com/600/600/nature/5"
          alt=""
        />
      </div> */}

      <div
        className="swiper"
        style={{
          backgroundImage: `url(${slide1})`
        }}
      />
      <div
        className="swiper"
        style={{
          backgroundImage: `url(${slide2})`
        }}
      />
      <div
        className="swiper"
        style={{
          backgroundImage: `url(${slide3})`
        }}
      />
      <div
        className="swiper"
        style={{
          backgroundImage: `url(${slide4})`
        }}
      />
      <div
        className="swiper"
        style={{
          backgroundImage: `url(${slide5})`
        }}
      />

      {/* url(http://lorempixel.com/600/600/nature/5) */}
    </Swiper>
  );
};
export default Carousel;
