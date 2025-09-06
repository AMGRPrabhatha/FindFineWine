import { Divider } from 'antd';
import React from 'react'
import { FaFire } from "react-icons/fa6";

interface WineRecommendation {
  Title: string;
  Description: string;
  price: number;
  Country: string;
  "IMG URL": string;
  "Grape Variety": string;
  "Wine Type": string;
  Gender: string;
  Occasion: string;
  "Trending Score": number;
}

interface Trending {
  Title: string;
}

interface RecommendProps {
  recommendations: WineRecommendation[];
  trending: Trending[];
  hasFetched: boolean;
}

const Recommend: React.FC<RecommendProps> = ({ recommendations, trending, hasFetched }) => {
  

  if (!hasFetched) {
    return <div className='text-2xl mb-4 font-basker  text-[#482817] object-center'>Your recommendations will display here.</div>
  }

  if (!recommendations || recommendations.length === 0 || recommendations[0]?.Title === "none") {
    return <div className='text-2xl mb-4 font-basker  text-[#482817] items-center'> There are no recommended wines for your selection.</div>
  }
  
  return (
    <div className='grid lg:grid-cols-2 w-full gap-3 mb-8'>
      {recommendations.map((card, i) => (
        
        <div key={i} className='relative flex flex-col items-center shadow-md rounded-lg border p-2 border-indigo-300 bg-white h-[100%]'>
          
          {card.Title === trending[0].Title ? <div className='ml-0 flex gap-2'><FaFire className='text-red-600 items-center mt-1' />Trending</div> : null}

          <img src={card["IMG URL"]} alt={card.Title} className='w-[25%] h-[50%] mx-auto'/>
          
          <h3 className='text-center my-2 font-semibold'>{card.Title}</h3>
          
          <p className='mb-2 text-ellipsis overflow-hidden text-para font-sans font-light text-center h-[45px]'>{card.Description}</p>
          
          <div className='flex flex-row gap-10 text-center my-2'>
            <p>LKR {card.price}</p>
            <button className='justify-center rounded px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm hover:bg-[#e6e0eb]'>view store</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Recommend
