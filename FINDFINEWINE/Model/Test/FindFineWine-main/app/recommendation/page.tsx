import React from 'react'
import Form from '../components/form'
import Image from 'next/image'
import wallpaper from '../assets/1965.jpg'
import Heading from '../components/heading'

const Recommendation = () => {
  return (
    <div className='w-full max-w-7xl flex flex-col mx-auto'>
      <Image
        className="-z-20 object-cover object-center opacity-10"
        priority
        src={wallpaper}
        fill
        alt="hero image example"
      />
      
      <Heading  
          
          heading ="Wine Recommendation" 
          subheading = "A Wine Recommendation Machine Learning Model uses sophisticated algorithms to analyze various wine characteristics and user preferences. It processes data on wine attributes like flavor, aroma, body, and acidity, alongside user ratings and consumption patterns. This analysis helps identify trends and patterns, enabling the model to understand individual taste profiles."
        />
      <div className='flex mt-3'>
        <div className='flex container justify-center'>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default Recommendation
