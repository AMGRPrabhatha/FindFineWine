
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import recommendImage from '@/app/assets/recommendImage.png'

const recommendsec = () => {
  return (
    <div className='max-w-7xl mx-auto flex mt-20 p-4 '>
        <div className='w-2/3 items-center  content-center font-basker'>
            <div className='mb-6'>
                <h2 className='text-2xl text-[#d986e6]'>Machine Learning Model</h2>
                <h1 className='text-5xl mb-4  text-[#482817]'>Wine Recommendation</h1>
                <p className='mb-3 textlg  text-[#613168]'>A Wine Recommendation Machine Learning Model uses sophisticated algorithms to analyze various wine characteristics and user preferences. It processes data on wine attributes like flavor, aroma, body, and acidity, alongside user ratings and consumption patterns. This analysis helps identify trends and patterns, enabling the model to understand individual taste profiles.</p>
                <p className=' text-[#613168]'>By predicting user preferences, the model suggests wines that align with personal tastes, enhancing the wine selection experience. Whether for enthusiasts seeking new varieties or casual drinkers looking for reliable choices, this personalized recommendation system offers curated wine options, making the process of discovering and enjoying wines more enjoyable and tailored.</p>
            </div>
            <div>
                <Link href={"/recommendation"} className='rounded-md bg-[#d4c1e4] text-[#482817] text-lg py-2 px-3'>SEE MORE</Link>
            </div>
        </div>
        <div className='w-1/3 '>
            <Image src={recommendImage} width={400}  height={50} alt=''></Image>
        </div> 
     </div>
     
    )
}

export default recommendsec
