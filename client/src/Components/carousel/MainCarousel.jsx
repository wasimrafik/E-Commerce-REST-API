import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {MainCarouselData}  from './MainCarouselData';
import { useNavigate } from "react-router-dom";

const MainCarousel = () => {

    const navigate = useNavigate();

    const items = MainCarouselData.map((item) =>  <img className='cursor-pointer' onClick={()=>navigate('/')} src={item.image} alt="" />)

    
  return (
    <div className='mx-0 my-0'>
        
        <AliceCarousel
        animationType="fadeout" 
        autoPlay
        autoPlayInterval={3000}
        animationDuration={800}
        disableButtonsControls
        infinite
        items={items}
    />
    </div>
  )
}

export default MainCarousel