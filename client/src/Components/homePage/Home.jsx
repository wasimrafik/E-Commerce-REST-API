import React from 'react'
import MainCarousel from '../carousel/MainCarousel'
import CarouselHomeSec1 from './homeSectionCarousel/CarouselSec1/CarouselHomeSec1'
// import ProductList from '../../features/productList/ProductList'


const Home = () => {
  return (
    <div>
      <div>
        <MainCarousel />
      </div>

      <div>
      <CarouselHomeSec1 />
      </div>
    </div>
  )
}

export default Home