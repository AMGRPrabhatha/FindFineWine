'use client'

import { useState } from 'react'
import { z } from 'zod'
import { FormDataSchema } from '@/app/components/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Recommend from '../recommendation/recommend'

type Inputs = z.infer<typeof FormDataSchema>

const wineVarieties = {
  "White Wine": ["Pinot Grigio", "Chardonnay", "Sauvignon Blanc", "Vermentino", "Moscato", "Riesling", "Pinot Gris", "Chenin Blanc"],
  "Red Wine": ["Malbec", "Cabernet Sauvignon", "Merlot", "Shiraz/Syrah", "Pinot Noir", "Tempranillo", "Pinot Nero"],
  "Rosé Wine": ["Grenache/Cinsault/Syrah", "Grenache", "Grenache/Cinsault/Vermentino", "Pinot Noir", "Pinot Noir/Syrah", "Pinot Noir/Chardonnay", "Shiraz/Syrah", "Zinfandel", "Grenache/Syrah", "Grenache/Cinsault"]
}

export default function Form() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const [grapeVarieties, setGrapeVarieties] = useState<string[]>(wineVarieties["White Wine"])
  const [resData, setResData] = useState<WineRecommendation[]>([])
  const [trending, setTrending] = useState<Trending[]>([])
  const [hasFetched, setHasFetched] = useState(false);

  const processForm: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      setResData(result.recommended_wines);
      setTrending(result.trending_wine)
      setHasFetched(true);
      
      reset()
    } catch (error) {
      console.error('Error:', error)
      setHasFetched(true);
    }
  }

  const handleWineTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value
    setGrapeVarieties(wineVarieties[selectedType] || [])
  }

  return (
    <section className='flex w-full'>
      <form className='w-1/2' onSubmit={handleSubmit(processForm)}>
        <div>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='flex-row col-span-12'>
              <label
                htmlFor='Type'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Type of Wine
              </label>
              <div className='mt-2'>
                <select
                  id='Type'
                  {...register('Type')}
                  onChange={handleWineTypeChange}
                  autoComplete='Type-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  
                  <option value="White Wine">White Wine</option>
                  <option value="Red Wine">Red Wine</option>
                  <option value="Rosé Wine">Rosé Wine</option>
                  
                </select>
                {errors.Type?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.Type.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex-row col-span-12'>
              <label
                htmlFor='variety'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Grape Variety
              </label>
              <div className='mt-2'>
                <select
                  id='variety'
                  {...register('variety')}
                  autoComplete='variety-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  {grapeVarieties.map(variety => (
                    <option key={variety}>{variety}</option>
                  ))}
                </select>
                {errors.variety?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.variety.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex-row col-span-12'>
              <label
                htmlFor='occasion'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Occasion
              </label>
              <div className='mt-2'>
                <select
                  id='occasion'
                  {...register('occasion')}
                  autoComplete='occation-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value={"Casual Gatherings"}>Casual Gatherings</option>
                  <option value="Dinner Party Wines">Dinner Party Wines</option>
                  <option value="Everyday/Weeknight Wines">Everyday/Weeknight Wines</option>
                  <option value="Outdoor/BBQ Wines">Outdoor/BBQ Wines</option>
                  <option value="Special Occasion Wines">Special Occasion Wines</option>
                  <option value="Celebratory Wines">Celebratory Wines</option>
                  
                </select>
                {errors.occasion?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.occasion.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex-row col-span-12'>
              <label
                htmlFor='gender'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Gender
              </label>
              <div className='mt-2'>
                <select
                  id='gender'
                  {...register('gender')}
                  autoComplete='gender-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  
                  
                </select>
                {errors.gender?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-5'>
          <div className='flex justify-between'>
            <button
              type='submit'
              className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-[#6b21a8] hover:bg-[#e6e0eb] disabled:cursor-not-allowed disabled:opacity-50'
            >
              Recommend
            </button>
          </div>
        </div>
      </form>
      <div className='w-1/2 place-self-center'>
        <Recommend recommendations={resData} trending={trending} hasFetched={hasFetched} />
      </div>
    </section>
  )
}
