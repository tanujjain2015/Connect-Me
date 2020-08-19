import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import Typography  from "@material-ui/core/Typography";

// import image1 from "../../../assets/img/bg.jpg";
// import image2 from "../../../assets/img/bg2.jpg";
// import image3 from "../../../assets/img/bg3.jpg";
import image1 from "../../../assets/img/image4.jpg";
import image2 from "../../../assets/img/image5.png";
import image3 from "../../../assets/img/hero.png";


import styles from "../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} lg={12}  className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div >
                  <h3 style={{textAlign: 'center'}}> Where Learning is Fun!!!</h3>
                  <img src={image1} alt="First slide" className="slick-image" style={{height:'600px'}}/>
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" /> 
                    </h4>
                  </div>
                </div>
                <div>
                <h3 style={{textAlign: 'center'}}>Explore our Offerings Today!!!</h3>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                    style={{height:'600px'}}
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      
                    </h4>
                  </div>
                </div>
                <div>
                <h3 style={{textAlign: 'center'}}>Signup for Free!!!</h3>
                  <img src={image3} alt="Third slide" className="slick-image" style={{height:'600px'}}/>
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      
                    </h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
