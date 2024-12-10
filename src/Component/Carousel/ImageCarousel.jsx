import React from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'; // Adjust based on your library
import carouselData from '../../Data/CarouselData'

const ImageCarousel = () => {
  return (
    <CCarousel controls transition="crossfade">
      <CCarouselItem>
        <CImage className="d-block w-100" src={carouselData[0]} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src={carouselData[1]} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src={carouselData[2]} alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className="d-block w-100" src={carouselData[3]} alt="slide 1" />
      </CCarouselItem>
    </CCarousel>
  );
};

export default ImageCarousel;