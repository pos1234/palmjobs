import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DropDown from '@/components/DropDown';
import { useState } from 'react';
import Link from 'next/link';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';

const catagoryData = [{ name: 'Category' }, { name: 'Full Time' }, { name: 'Part Time' }, { name: 'Remote' }, { name: 'Internship' }];
const Home = () => {
    const router = useRouter();
    const [location, setLocation] = useState(false);
    const [category, setCategory] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const [catag, setCatag] = useState(catagoryData[0]);
    const openLocation = () => {
        setLocation(!location);
    };
    const openCategory = () => {
        setCategory(!category);
    };
    const handleSearch = () => {
        typeof window !== 'undefined' &&  router.push({
            pathname: '/jobs',
            query: { param1: searchText, param2: address }
        });
    };
    return (
        <>
            <Head>
                <title>Palm Jobs: Job Search and Employment Opportunities in Ethiopia | NGO, International Companies, and More</title>
                <meta
                    name="description"
                    content="Discover a myriad of job listings and employment opportunities in Ethiopia on Palm Jobs. Whether you're seeking careers in NGO sectors, vacancies at Safaricom Ethiopia, or exploring other recruitment possibilities, our extensive job search engine simplifies your journey towards landig the ideal job. Browse jobs, submit your resume, and step into a world of endless career possibilities today."
                />
            </Head>
            <div className="px-3 lg:px-16 lg:col-span-16 overflow-hidden">
                <Navigation />
                <div>
                    <div className="md:mt-20">
                        <p className="text-center mb-5 sm:mb-10">
                            <span className="bg-gradient-to-r from-gradientFirst to-gradientSecond text-center px-3 text-textW py-1 rounded-full mr-5 block max-sm:mx-20 max-sm:mt-10 max-sm:mb-4 sm:inline cursor-pointer">
                                For Employers
                            </span>
                            <Link className="font-shW text-gradientFirst underline cursor-pointer" href="/users/employer/">
                                Post Job
                            </Link>
                        </p>
                    </div>
                    <p className="font-shW text-shS text-center text-[40px] sm:text-[60px] md:text-[72px] md:leading-[92px]">
                        Connect. Grow. <span className="text-gradientFirst">Succeed.</span>
                    </p>
                    <p className="text-center text-[#393D48] max-sm:mt-3 sm:max-md:mb-5">Find your next job. Easy as a breeze.</p>
                    <div className="grid grid-cols-12 gap-y-4 max-sm:px-5 max-sm:pt-10 sm:space-x-5 md:space-x-2 lg:space-x-5 lg:px-10 xl:px-40 md:py-5 md:pt-10">
                        <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 md:h-16  sm:col-span-6 md:col-span-4 lg:col-span-4">
                            <div className="col-span-2 flex items-center justify-center text-gray-500">
                                <PersonSearchOutlinedIcon />
                            </div>
                            <div className="col-span-10 flex items-center pr-2">
                                <input
                                    onChange={(e) => setSearchText(e.currentTarget.value)}
                                    type="text"
                                    placeholder="What"
                                    className="max-md:h-20 pl-3 focus:ring-0 border-0 w-full bg-[#F8F8F8] "
                                />
                            </div>
                        </div>
                        <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 md:h-16 sm:col-span-6 md:col-span-4 lg:col-span-4">
                            <div className="col-span-2 flex items-center justify-center text-gray-500">
                                <PinDropOutlined />
                            </div>
                            <div className="col-span-10 flex items-center pr-2">
                                <input
                                    onChange={(e) => setAddress(e.currentTarget.value)}
                                    type="text"
                                    placeholder="Where"
                                    className="max-md:h-20 pl-3 focus:ring-0 border-0 w-full bg-[#F8F8F8]"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="text-shS col-span-12  rounded-2xl sm:col-start-4 h-20 max-sm:mx-5 sm:col-end-10 sm:max-lg:mt-5 sm:h-20 md:mt-0 md:h-16 md:col-span-4 lg:col-span-3 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond"
                        >
                            <SearchOutlinedIcon sx={{ fontSize: '1.5rem', marginRight: '0.2rem' }} /> Search
                        </button>
                    </div>
                   
                    <div className="mt-10">
                        <p className="text-center mb-10">
                          
                            Apply with ease
                            <Link
                                href="users/candidate/profile"
                                className="font-shW text-gradientFirst underline cursor-pointer max-sm:block ml-2"
                            >
                                Upload your Resume
                            </Link>
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default Home;
