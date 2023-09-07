import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
const Abc = () => {
    return (
        <div className="col-span-12 grid grid-cols-12 md:h-24 rounded-2xl md:bg-blue-500 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <div className="col-span-2 flex items-center justify-center">
                <PersonSearchOutlinedIcon />
            </div>
            <div className="col-span-10 flex items-center pr-2">
                <input type="text" placeholder="What are you looking for?" className="h-20 pl-3 focus:outline-0 w-full" />
            </div>
        </div>
    );
};
const AbD = () => {
    return (
        <div className="col-span-6 justify-self-center grid grid-cols-12 rounded-full border-2 text-fadedText px-5 py-1.5  sm:col-span-4 md:col-span-3 lg:col-span-2">
            <div className="col-span-2 flex items-center justify-center">
                <SearchOutlinedIcon className="text-[16px]" />
            </div>
            <div className="col-span-10 max-sm:text-[14px] md:text-[13px] flex items-center pl-2">top Searched</div>
        </div>
    );
};
const Home = () => {
    const [location, setLocation] = useState(false);
    const [category, setCategory] = useState(false);
    const openLocation = () => {
        setLocation(!location);
    };
    const openCategory = () => {
        setCategory(!category);
    };
    return (
        <div className="px-3 md:px-16">
            <Navigation />
            <div>
                <div className="md:mt-20">
                    <p className="text-center mb-5 sm:mb-10">
                        <span className="bg-gradient-to-r from-gradientFirst to-gradientSecond text-center px-3 text-textW py-1 rounded-full mr-5 block max-sm:mx-20 max-sm:mt-10 max-sm:mb-4 sm:inline cursor-pointer">
                            For Employers
                        </span>
                        Explore talents <span className="font-shW text-gradientFirst underline cursor-pointer">Post Job</span>
                    </p>
                </div>
                <p className="font-shW text-shS text-center text-[40px] sm:text-[60px] md:text-[72px] md:leading-[92px]">
                    Right Fit! <br /> The Perfect Job on <span className="text-gradientFirst">YES</span>
                </p>
                <p className="text-center text-[#393D48] max-sm:mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt in
                </p>
                <div className="grid grid-cols-12 gap-y-4 max-sm:px-5 max-sm:pt-10 sm:space-x-5 md:space-x-2 lg:space-x-5 lg:px-10 xl:px-40 md:py-5 md:pt-10">
                    <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 md:h-16  sm:col-span-6 md:col-span-4 lg:col-span-3">
                        <div className="col-span-2 flex items-center justify-center text-gray-500">
                            <PersonSearchOutlinedIcon />
                        </div>
                        <div className="col-span-10 flex items-center pr-2">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="h-20 pl-3 focus:outline-0 w-full bg-[#F8F8F8] sm:h-[90%]"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 h-20 md:h-16 sm:col-span-6 md:col-span-4 lg:col-span-3">
                        <div className="col-span-2 flex items-center justify-center text-gray-500">
                            <LocationOnOutlinedIcon />
                        </div>

                        <div className="col-span-10 bg-[#F8F8F8] relative cursor-pointer rounded-2xl" onClick={openLocation}>
                            <select className="rounded-2xl block bg-[#F8F8F8] appearance-none h-full w-full text-gray-700 py-3 px-4 pr-8 focus:outline-none cursor-pointer border-0 text-[gray]">
                                <option className="text-thS font-thW leading-thL text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2">
                                    Location
                                </option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div className="pointer-events-none absolute right-0 top-7 flex items-center px-2 text-gray-700 sm:top-5">
                                {location == true ? (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.8rem' }} />
                                ) : (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 h-20 sm:col-start-4 sm:col-end-10 sm:h-20 md:h-16 md:col-span-4 lg:col-span-3">
                        <div className="col-span-2 flex items-center justify-center text-gray-500">
                            <CategoryOutlinedIcon />
                        </div>
                        <div className="col-span-10 bg-[#F8F8F8] relative cursor-pointer rounded-2xl" onClick={openCategory}>
                            <select className="rounded-2xl block bg-[#F8F8F8] appearance-none h-full w-full text-gray-700 py-3 px-4 pr-8 focus:outline-none cursor-pointer border-0 text-[gray]">
                                <option className="text-thS font-thW leading-thL text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2">
                                    Category
                                </option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                            <div className="pointer-events-none absolute right-0 top-7 flex items-center px-2 text-gray-700 sm:top-5">
                                {category == true ? (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.8rem' }} />
                                ) : (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="text-shS col-span-12  rounded-2xl sm:col-start-4 h-20 max-sm:mx-5 sm:col-end-10 sm:max-lg:mt-5 sm:h-20 md:h-16 lg:col-span-3 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond">
                        <SearchOutlinedIcon sx={{ fontSize: '1.5rem', marginRight: '0.2rem' }} /> Search
                    </button>
                </div>
                <div className="grid grid-cols-12 max-sm:gap-y-3 gap-y-3 max-sm:gap-x-2 max-sm:pt-5 sm:max-lg:mt-10 lg:grid-cols-10 lg:px-10 xl:px-52 ">
                    <AbD />
                    <AbD />
                    <AbD />
                    <AbD />
                    <AbD />
                </div>
                <div className="mt-10">
                    <p className="text-center mb-10">
                        <span className="bg-gradient-to-r from-gradientFirst to-gradientSecond text-center px-3 text-textW py-1 rounded-full mr-5 block max-sm:mx-40 max-sm:mt-10 max-sm:mb-4 sm:inline cursor-pointer">
                            New
                        </span>
                        Stay connected to Recent jobs
                        <span className="font-shW text-gradientFirst underline cursor-pointer max-sm:block">Upload your Resume</span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Home;
