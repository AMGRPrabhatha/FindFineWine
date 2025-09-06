import React from 'react'

const heading = (props) => {
  return (
    <div className='bg-cover bg-center w-full bg-heading-texture py-3 font-basker'>
        <h1 className='text-center text-4xl mb-2 font-semibold  text-[#482817]'>
            {props.heading}
        </h1>
        <h1 className='text-center text-lg font-semibold  text-[#613168]'>
            {props.subheading}
        </h1>
    </div>
  )
}

export default heading
