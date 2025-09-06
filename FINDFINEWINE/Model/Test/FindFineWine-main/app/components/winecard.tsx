import { Rate } from 'antd'
import React from 'react'

const Winecard = (props) => {
   const  wine = props.data;
  return (
    <div key={wine.id} className='flex flex-col items-center shadow-md rounded-lg border border-indigo-300 bg-gray-300 h-[100%]'>
          <img src={wine.IMG_URL} alt="" className='w-[20%] h-[60%]  mt-2  mx-auto'/>
          
          <h3 className='text-center mt-2 font-semibold'>{wine.Title}</h3>

          <p className='font-sans font-light text-center '>{wine.Grape}</p>
          <p className='mb-1  font-sans font-thin text-sm text-center '><span className='font-semibold'>location: {wine.Country}</span></p>

          <div className='flex flex-row gap-5 items-center text-center my-2'>
            <Rate defaultValue={4.5} allowHalf disabled className='text-sm'/>
            <p className='text-sm font-light'>{wine.Price}</p>
          </div>  
    </div>
  )
}

export default Winecard