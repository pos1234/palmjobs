import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import SearchBar from '@/components/job/SearchBar';
const Home = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const handleSearch = () => {
        typeof window !== 'undefined' && router.push({
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
            <div className="overflow-hidden ">
                <Navigation />
                <div className='flex pt-20 flex-wrap gap-y-10 gap-5 xl:px-40 md:max-xl:justify-center'>
                    <div className='flex-grow flex flex-col gap-3 md:gap-5 justify-center md:max-xl:items-center sm:max-lg:items-center'>
                        {/* <p className="max-md:text-center">
                            <span className="bg-gradient-to-r from-gradientFirst to-gradientSecond text-center px-3 text-textW py-1 rounded-full mr-5 block max-sm:mx-20 max-sm:mt-10 max-sm:mb-4 sm:inline cursor-pointer">
                                For Employers
                            </span>
                            <Link className="font-shW text-gradientFirst underline cursor-pointer" href="/users/employer/">
                                Post Job
                            </Link>
                        </p> */}
                        <p className="font-shW text-shS max-md:justify-center flex items-center text-xl md:text-[46px] my-2">
                            Connect. Grow.<span className='-mt-6 md:-mt-9'>
                                <img src="/images/connectLeaf.svg" alt="leaf" className='h-full max-md:w-10' />
                            </span><span className="text-gradientFirst">Succeed.</span>
                        </p>
                        <p className="max-md:text-center text-[#20262E] font-[600] md:text-[27px]">Find your next job. Easy as a breeze.</p>
                        <div className='pt-5'>
                            <SearchBar single={true} home={true} searchWord={searchText} setSearchWord={setSearchText} addressHolder={address} setAddressHolder={setAddress} setTheSearchTerm={handleSearch} />
                        </div>
                        <p className="max-md:text-center mt-4">
                            Apply with ease
                            <Link
                                href="users/candidate/profile"
                                className="font-shW text-gradientFirst underline cursor-pointer max-sm:block ml-2"
                            >
                                Upload your Resume
                            </Link>
                        </p>
                    </div>
                    <div className='flex pl-10 max-lg:w-full justify-center sm:max-lg:items-center homeLeafPattern'>
                        <img src="/images/HeroSection.webp" alt="employees" />
                    </div>
                    <div className='w-full homeSurvey px-10 mt-10 flex sm:h-[129px] items-center justify-between flex-wrap max-sm:pb-5'>
                        <div className='flex flex-col'>
                            <p className='font-[600] text-[27px]'>Salary Survey</p>
                            <p className='font-[400]'>Find and compare salary information</p>
                        </div>
                        <Link href="/salaries" className='bg-black text-textW w-[225px] h-[56px] p-5 cursor-pointer rounded-[3px] flex gap-3 items-center justify-center'>
                            <img src="/icons/HomeHand.svg" alt="hand" />
                            <p className='flex items-end'>Explore More</p>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default Home;
