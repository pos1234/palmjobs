import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { getCompanyData, searchJobs, } from '@/backend/employerBackend'
import 'react-toastify/dist/ReactToastify.css';
import JobsShimmer from '@/components/shimmer/JobsShimmer';
import JobListCard from '@/components/job/JobListCard';
import JobDetail from '@/components/job/JobDetail';
import SearchBar from '@/components/job/SearchBar';
import CheckProfileCompletion from '@/components/CheckProfileCompletion';
const Jobs = () => {
    const router = useRouter();
    const [datePostedHolder, setDatePostedHolder] = useState('');
    const [expLevelHolder, setExpLevelHolder] = useState('');
    const [jobTypeHolder, setJobTypeHolder] = useState('');
    const [jobDetailId, setJobDetailId] = useState<string>(/* documents[0].$id */);
    const [openJobDetail, setOpenJobDetail] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>(/* documents[0] */);
    const [company, setCompany] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [address, setAddress] = useState('');
    const [addressHolder, setAddressHolder] = useState('');
    const [searchWord, setSearchWord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any>();
    const [maxPaginate, setMaxPaginate] = useState(5);
    const [minPaginate, setMinPaginate] = useState(1);
    const [companyData, setCompanyData] = useState<any>();
    const [companyName, setCompanyName] = useState('');
    const [employerId, setEmployerId] = useState('');
    const [allLoading, setAllLoading] = useState(false);
    const [forYou, setForYou] = useState(false)
    const [localValue, setLocalValue] = useState('')
    const [pageCount, setPageCount] = useState<number>()
    const [datePosted, setDatePosted] = useState('')
    useEffect(() => {
        const documents = getCompanyData(employerId);
        documents.then(async (res) => {
            if (res.documents && res.documents[0]) {
                setCompanyData(res.documents[0]);
                setCompanyName(res.documents[0].companyName);
            } else {
                setCompanyName('');
            }
        });
    }, [employerId]);
    const handleForYou = () => {
        if (forYou == false) {
            setAllLoading(true)
            const title = localStorage.getItem('jobTitle');
            const jobTitle = title ? title : ''
            title && setLocalValue(jobTitle)
            searchJobs(8, 0, jobTitle, '', jobTypeHolder, expLevelHolder, datePosted).then((res) => {
                setAllLoading(false)
                const count = Math.ceil(res.total / 8);
                setPageCount(count)
                res.documents && setData(res.documents)
                res.documents && res.documents.length !== 0 && setJobDetailId(res.documents[0].$id)
                res.documents && res.documents.length !== 0 && setJobDetails(res.documents[0])
            })
            setForYou(true)
        }
        if (forYou == true) {
            setLocalValue('')
            setForYou(false)
        }
    }
    const handleDatePosted = (date: string) => {
        if (date == "Past 24hrs") {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            setDatePosted(today.toISOString())
        }
        if (date == "Past week") {
            const now = new Date();
            const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
            setDatePosted(sevenDaysAgo.toISOString())
        }
        if (date == "Past month") {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            setDatePosted(thirtyDaysAgo.toISOString())
        }
    }
    const setTheSearchTerm = () => {
        typeof window !== 'undefined' && router.push({
            query: { param1: searchWord, param2: addressHolder }
        });
        typeof window !== 'undefined' && searchWord !== '' && localStorage.setItem('jobTitle', searchWord)
    };
    useEffect(() => {
        setAllLoading(true)
        if (Object.keys(router.query).length == 0) {
            searchJobs(8, 0, '', '', jobTypeHolder, expLevelHolder, datePosted).then((res) => {
                setAllLoading(false)
                const count = Math.ceil(res.total / 8);
                setPageCount(count)
                res.documents && setData(res.documents)
                res.documents && res.documents.length !== 0 && setJobDetailId(res.documents[0].$id)
                res.documents && res.documents.length !== 0 && setJobDetails(res.documents[0])
            })
        }
        if (Object.keys(router.query).length > 0) {
            const { param1, param2 }: any = router.query;
            searchJobs(8, 0, param1, param2, jobTypeHolder, expLevelHolder, datePosted).then((res) => {
                setAllLoading(false)
                const count = Math.ceil(res.total / 8);
                setPageCount(count)
                res.documents && setData(res.documents)
                res.documents && res.documents.length !== 0 && setJobDetailId(res.documents[0].$id)
                res.documents && res.documents.length !== 0 && setJobDetails(res.documents[0])
            })
            param1 && setSearchQuery(param1.toString());
            param1 && setSearchWord(param1.toString());
            param2 && setAddress(param2.toString());
            param2 && setAddressHolder(param2.toString());
        }
    }, [router.query, datePosted, jobTypeHolder, expLevelHolder]);
    const handleFetchPagination = async (offset: number) => {
        setAllLoading(true);
        const offsetValue = (offset - 1) * 8
        searchJobs(8, offsetValue, searchWord, address, jobTypeHolder, expLevelHolder, datePosted).then((res) => {
            setData(res.documents);
            setAllLoading(false);
        });
    }
    const itemsPerPage = 8
    const showPage = (page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        for (let i = 1; i <= data.length; i++) {
            const item = document.getElementById(`item-${i}`);
            if (item) {
                item.style.display = i >= startIndex && i < endIndex ? 'grid' : 'none';
            }
        }
        setCurrentPage(page);
    };
    const changePage = (page: number) => {
        if (page > 0 && pageCount && pageCount !== 0 && page <= pageCount) {
            showPage(page);
        }
    };
    const previousPage = () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
        setMinPaginate(minPaginate - 1);
        setMaxPaginate(maxPaginate - 1);
    };
    const nextPage = () => {
        if (pageCount && pageCount !== 0 && currentPage < pageCount) {
            showPage(currentPage + 1);
        }
        setMaxPaginate(maxPaginate + 1);
        setMinPaginate(minPaginate + 1);
    };

    const handleJobSelection = (jobId: string) => {
        const selected = data && data.filter((item: any) => item.$id == jobId)
        selected && setJobDetails(selected[0])
    }

    return (
        <>
            <div>
                <Navigation />
                {allLoading && <div className='mt-8 md:mt-28 px-3 xl:px-40'> <JobsShimmer /></div>}
                {!allLoading && (
                    <div className="grid grid-cols-12 sm:gap-x-10 mt-5">
                        <div className="col-span-12 grid grid-cols-12 gap-x-2 xl:gap-x-5">
                            <div className="col-span-12 flex flex-wrap relative xl:justify-center gap-x-2 gap-y-4">
                                <div className={!openJobDetail ? 'xl:px-40 border-b-[1px] w-full flex flex-wrap gap-x-2 gap-y-4 mb-5' : 'max-md:hidden xl:px-40 border-b-[1px] w-full flex flex-wrap gap-x-2 gap-y-4 mb-5'}>
                                    <div className={openJobDetail ? 'max-md:hidden w-full' : 'w-full'}>
                                        <SearchBar searchWord={searchWord}
                                            setSearchWord={setSearchWord}
                                            addressHolder={addressHolder}
                                            setAddressHolder={setAddressHolder}
                                            setTheSearchTerm={setTheSearchTerm}
                                        />
                                    </div>
                                    <div className='w-full justify-center flex gap-5 mt-2 items-center font-[500]'>
                                        <div onClick={handleForYou} className={`pb-2 cursor-pointer flex items-center gap-2 border-b-[3px] ${forYou ? 'border-b-gradientFirst' : ' border-textW hover:border-b-gradientFirst'}`}>
                                            <img src="/icons/forYouApple.svg" alt="forYouApple" />
                                            <p>For You</p>
                                        </div>
                                        <div onClick={handleForYou} className={`pb-2 cursor-pointer flex items-center gap-2 border-b-[3px]  ${forYou ? 'border-textW hover:border-b-gradientFirst' : 'border-b-gradientFirst'}`}>
                                            <img src="/icons/jobSearch.svg" alt="jobSearch.svg" />
                                            <p>Search</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={!openJobDetail ? 'w-full flex flex-wrap gap-3 xl:w-[1112px] mb-3' : 'max-md:hidden w-full flex gap-3 xl:w-[1112px] mb-3'}>
                                    <select value={jobTypeHolder} onChange={(e) => setJobTypeHolder(e.currentTarget.value)} name="jobType" id="jobType" className='w-[135px] border-[1px] border-[#F4F4F4] h-[32px] focus:border-[1px] hover:border-gradientFirst cursor-pointer focus:ring-0 focus:outline-0 hover:ring-0 focus:border-[#F4F4F4] text-sm rounded-full px-[16px] py-[4px] bg-[#F4F4F4]'>
                                        <option value="">Job Type</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        {/*                                         <option value="Remote">Remote</option>
 */}                                        <option value="Contract">Contract</option>
                                    </select>
                                    <select value={expLevelHolder} onChange={(e) => setExpLevelHolder(e.currentTarget.value)} name="experience" id="experience" className='w-[135px] border-[1px] border-[#F4F4F4] h-[32px] focus:border-[1px] hover:border-gradientFirst cursor-pointer focus:ring-0 focus:outline-0 hover:ring-0 focus:border-[#F4F4F4] text-sm rounded-full px-[16px] py-[4px] bg-[#F4F4F4]'>
                                        <option value="">Experience</option>
                                        <option value="0-2 years">0-2 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="6-8 years">6-8 years</option>
                                        <option value="9-10 years">9-10 years</option>
                                        <option value="10+ years">10+ years</option>
                                    </select>
                                    <select value={datePostedHolder} onChange={(e) => {
                                        setDatePostedHolder(e.currentTarget.value)
                                        handleDatePosted(e.currentTarget.value)
                                    }} name="dateposted" id="dateposted" className='w-[135px] border-[1px] border-[#F4F4F4] h-[32px] focus:border-[1px] hover:border-gradientFirst cursor-pointer focus:ring-0 focus:outline-0 hover:ring-0 focus:border-[#F4F4F4] text-sm rounded-full px-[16px] py-[4px] bg-[#F4F4F4]'>
                                        <option value="">Date Posted</option>
                                        <option value="">Any time</option>
                                        <option value="Past 24hrs">Past 24hrs</option>
                                        <option value="Past week">Past week</option>
                                        <option value="Past month">Past month</option>
                                        {/* <option value="Past 24hrs">Past 24hrs</option>
                                        <option value="Past week">Past week</option>
                                        <option value="Past month">Past month</option> */}
                                    </select>
                                </div>
                                {
                                    /* currentData && currentData.length == 0 && */ data && data.length == 0 && <div className='w-full items-center h-60 flex justify-center'>
                                        <p className='text-xl font-[500] w-full text-center leading-[40px] flex justify-center flex-wrap xl:w-[70%]'> Looks like there aren't any matches right now. <br /> Why not try some different keywords or tweak your filters?</p>
                                    </div>
                                }
                                <div className="w-full flex justify-center gap-5 max-md:p-3 pb-0 rounded-x-2xl">
                                    <div
                                        className={
                                            openJobDetail == true
                                                ? 'hidden flex flex-col gap-y-3 max-h-[800px] overflow-auto h-[800px] hideScrollBar md:w-1/2 lg:w-1/3 md:flex xl:w-[458px]'
                                                : 'flex flex-col max-h-[800px] gap-y-3 overflow-auto hideScrollBar h-[800px] md:w-1/2  lg:w-1/3 md:flex xl:w-[458px]'
                                        }
                                    >
                                        {/* currentData && currentData.length !== 0 && */ data && data.length !== 0 && <CheckProfileCompletion />}
                                        {/* currentData &&
                                            currentData */data &&
                                            data.map((items: any, index: number) => {
                                                return <JobListCard items={items} key={index} jobDetailId={jobDetailId} setEmployerId={setEmployerId} setJobDetailId={setJobDetailId} setOpenJobDetail={setOpenJobDetail} handleJobSelection={handleJobSelection}
                                                />
                                            })}
                                    </div>
                                    <div
                                        className={
                                            openJobDetail == true
                                                ? 'grid grid-cols-12 gap-x-5 md:w-1/2 lg:w-3/5 xl:w-[654px] h-[800px]'
                                                : 'grid grid-cols-12 gap-x-5 max-md:hidden md:w-1/2 lg:w-3/5 xl:w-[654px] h-[800px]'
                                        }
                                    >
                                        {jobDetails && data.length !== 0 && /* currentData.length !== 0 && */ <JobDetail
                                            jobDetails={jobDetails}
                                            companyName={companyName}
                                            company={company}
                                            setCompany={setCompany}
                                            companyData={companyData}
                                            openJobDetail={openJobDetail}
                                            setOpenJobDetail={setOpenJobDetail}
                                        />}

                                    </div>

                                </div>

                            </div>
                        </div>
                        <div
                            className={
                                pageCount && pageCount !== 0 && pageCount > 1
                                    ? openJobDetail
                                        ? 'col-span-5 flex justify-center items-center gap-x-3 mt-4 max-md:hidden'
                                        : 'flex justify-center items-center gap-x-3 mt-4 col-span-12 md:col-span-6 lg:col-span-5'
                                    : 'hidden'
                            }
                        >
                            <button
                                id="paginationBackWardButton"
                                name="paginationBackWardButton"
                                aria-labelledby="paginationBackWardButton"
                                className={
                                    maxPaginate > 5 && pageCount && pageCount !== 0 && pageCount > 5
                                        ? 'border bg-gradient-to-r from-gradientFirst to-gradientSecond text-white rounded-md px-3 py-1 text-center'
                                        : 'hidden'
                                }
                                onClick={previousPage}
                            >
                                <ArrowBackIosIcon sx={{ fontSize: '1rem' }} />
                            </button>
                            {[...Array(pageCount)].map((_, index) => (
                                <button
                                    id={`${index}`}
                                    name={`${index}`}
                                    aria-labelledby={`${index}`}
                                    key={index}
                                    className={
                                        index + 1 < maxPaginate && index + 2 > minPaginate
                                            ? currentPage == index + 1
                                                ? 'bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-md px-3 py-1 mx-1 text-white'
                                                : 'hover:bg-gray-200 hover:border-gray-200 border border-gray-400 rounded-md px-3 py-1 mx-1'
                                            : 'hidden'
                                    }
                                    onClick={() => {
                                        changePage(index + 1)
                                        handleFetchPagination(index + 1)
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                aria-labelledby="paginationForwardButton"
                                id="paginationForwardButton"
                                name="paginationForwardButton"
                                className={
                                    pageCount && pageCount !== 0 && maxPaginate < pageCount
                                        ? 'bg-gradient-to-r from-gradientFirst to-gradientSecond text-white rounded-md px-3 py-1 '
                                        : 'hidden'
                                }
                                onClick={nextPage}
                            >
                                <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                            </button>
                        </div>
                    </div>
                )}
                <Footer />
            </div >

        </>
    );
};
export default Jobs;


/* export async function getStaticProps() {
    const promise = fetchJobs()

    const { documents } = await promise;

    return {
        props: {
            documents
        },
        revalidate: 60
    };
} */