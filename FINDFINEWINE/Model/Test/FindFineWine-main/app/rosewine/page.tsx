"use client"

import React, { useState, useEffect } from 'react';
import Winecard from '../components/winecard';
import { Pagination } from 'antd';
import { CiSearch } from "react-icons/ci";
import Heading from '../components/heading';


const WineListPage: React.FC = () => {
    const [wines, setWines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the wine data from the API
        const fetchWines = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rose');
                const data = await response.json();
                setWines(data);
                console.log(wines)
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

    const filteredWines = wines.filter((wine) =>
        wine.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const currentWines = filteredWines.slice(startIndex, startIndex + pageSize);

    return (
        <div className='w-full max-w-7xl flex flex-col mx-auto font-basker'>
            <div>
                {/* <h1 className='text-center text-2xl my-7 font-semibold underline decoration-wavy text-gray-600'>
                    Red Wines
                </h1> */}
                <Heading 
                    heading ="Rosé Wines" 
                    subheading = "Rosé wine, known for its pink hue, is light, refreshing, and versatile. It offers flavors of red fruits, citrus, and floral notes, making it perfect for summer sipping and pairing with various dishes."
                />
            </div>
            <div className="relative mt-4 w-[50%]">
                <input
                    type="text"
                    placeholder="Search wines"
                    className='w-full border border-indigo-300 rounded-lg px-4 py-1 pl-10'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
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
