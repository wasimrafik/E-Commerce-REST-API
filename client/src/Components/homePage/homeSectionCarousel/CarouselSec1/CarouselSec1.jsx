import React from 'react'

const CarouselSec1 = () => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem]  mx-3'>
        <div className='h-[13rem] w-[80%] px-5'>
            <img className='object-cover object-top w-full h-full' src="https://www.ethnicplus.in/media/catalog/product/cache/c8dd8ab41cc505e943026004bfd0a7b6/f/u/full_blue_side.jpg" alt="" />
        </div> 

        <div className='p-4'>
            <h3 className='text-lg font-medium text-gray-900'>NoFiller</h3>
            <p className='mt-2 text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
        </div>
    </div>
  )
}

export default CarouselSec1