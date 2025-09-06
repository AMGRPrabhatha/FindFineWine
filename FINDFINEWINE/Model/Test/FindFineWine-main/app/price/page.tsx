"use client"

import React, { useState, useEffect } from 'react';
import Winecard from '../components/winecard';
import { Pagination } from 'antd';
import { CiSearch } from "react-icons/ci";
import { Slider } from 'antd';


const WineListPage: React.FC = () => {
    const [wines, setWines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 250000]);

    useEffect(() => {
        // Fetch the wine data from the API
        const fetchWines = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/wines');
                const data = await response.json();
                setWines(data);
            } catch (error) {
                console.error('Error fetching wines:', error);
            }
        };

        fetchWines();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);  // Reset to first page on search
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
        setCurrentPage(1);  // Reset to first page on filter change
    };

    const extractPrice = (priceString: string) => {
        const price = parseFloat(priceString.replace(/[^0-9.]/g, ''));
        
        return isNaN(price) ? 0 : price;
    };

    const filteredWines = wines.filter((wine: { Title: string, Price: string }) =>
        wine.Title.toLowerCase().includes(searchTerm.toLowerCase()) && (extractPrice(wine.Price) >= priceRange[0] && extractPrice(wine.Price) <= priceRange[1])
    );

    const startIndex = (currentPage - 1) * pageSize;
    const currentWines = filteredWines.slice(startIndex, startIndex + pageSize);

    return (
        <div className='w-full max-w-7xl flex flex-col mx-auto'>
            <div>
                <h1 className='text-center text-2xl my-7 font-semibold underline decoration-wavy text-gray-600'>
                   Wines
                </h1>
            </div>
            <div className='flex flex-row'>
                <div className="relative mt-4 w-[50%]">
                    <input
                        type="text"
                        placeholder="Search wines"
                        className='w-full border border-indigo-300 rounded-lg px-4 py-1 pl-10'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <CiSearch className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className='flex flex-row items-center justify-center gap-5 mt-2 w-[50%] mx-6'>
                    <p className='text-lg'>Filter by price:</p>
                    <Slider 
                        className='w-full' 
                        value={priceRange} 
                        range={{ draggableTrack: true }} 
                        
                        max={250000}
                        onChange={handlePriceChange}
                        />
                </div>    
            </div>
            
            

            {/* Render filter options here */}

            <section className='grid lg:grid-cols-4 w-full justify-center items-center gap-8 my-8'>
                {currentWines.map((wine) => (
                    <Winecard data={wine} />
                ))}
            </section>
            <Pagination
                className='mx-auto mb-5'
                current={currentPage}
                pageSize={pageSize}
                total={filteredWines.length}
                onChange={handlePageChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    );
};

export default WineListPage;
