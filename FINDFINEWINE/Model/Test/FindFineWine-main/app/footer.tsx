import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";


const footer = () => {
  return (
    <div className='mt-10 bg-opacity-50 bg-[#d4c1e4] bg-cover bg-center w-full bg-footer-texture'>
        
      <div className='flex flex-row justify-between max-w-7xl mx-auto w-full py-8 '>
        <div className="flex mr-20">
            <h1 className="text-black font-semibold text-2xl items-center " >
                FindFine
                <span className="text-[#6b21a8]">Wine</span>
            </h1>
        </div>
        <div className='flex space-x-28 font-basker text-base'>
            <div className="flex flex-col ">
                <div className='border-b-2 border-[#6b21a8] mb-4 pb-2'>
                    <p className='mx-5 font-semibold'>CONTACT US</p>
                </div>
                <div className='space-y-3'>
                    <p className='flex gap-2'><IoLocationOutline className='text-xl text-[#6b21a8] '/>Galle, Sri Lanka</p>
                    <p className='flex gap-2'><MdOutlineEmail className='text-xl text-[#6b21a8] '/>Mewan@gmail.com</p>
                    <p className='flex gap-2'><FiPhone className='text-xl text-[#6b21a8] '/>+94 76 8 859 975</p>
                </div>
            </div>
            <div className="flex flex-col ">
                <div className='border-b-2 border-[#6b21a8] mb-4 pb-2'>
                    <p className='mx-20 font-semibold'>ABOUT US</p>
                </div>
                <div className='space-y-2'>
                    <p className='w-[250px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
                    
                </div>
            </div>
            <div className="flex flex-col ">
                <div className='border-b-2 border-[#6b21a8] mb-4 pb-2'>
                    <p className='mx-10 font-semibold'>WINES</p>
                </div>
                <div className='flex flex-col mx-auto space-y-2'>
                    <a className='hover:text-[#6b21a8]' href="./redwine">Red Wine</a>
                    <a className='hover:text-[#6b21a8]' href="./whitewine">White Wine</a>
                    
                    <a className='hover:text-[#6b21a8]' href="./rosewine">Rose Wine</a>
                    
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default footer
