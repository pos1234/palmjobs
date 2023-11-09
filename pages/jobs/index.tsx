import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState, Fragment } from 'react';
import ConfirmModal from '@/components/ConfirmModal';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import { getRole, getAccount, signOut } from '@/lib/accountBackend';
import { getCompanyData, getProfileData, fetchJobs, } from '@/lib/employerBackend'
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobsShimmer from '@/components/shimmer/JobsShimmer';
import JobListCard from '@/components/job/JobListCard';
import Filter from '@/components/job/Filter';
import JobDetail from '@/components/job/JobDetail';
import SearchBar from '@/components/job/SearchBar';
const Jobs = () => {
    const router = useRouter();
    const [datePosted, setDatePosted] = useState('');
    const [expLevel, setExpLevel] = useState('');
    const [jobType, setJobType] = useState('');
    const [datePostedHolder, setDatePostedHolder] = useState('');
    const [expLevelHolder, setExpLevelHolder] = useState('');
    const [jobTypeHolder, setJobTypeHolder] = useState('');
    const [sortBy, setSortBy] = useState('Best Match');
    const profile = '/images/profile.svg';
    const uploadResume = '/images/uploadResume.svg';
    const [jobDetailId, setJobDetailId] = useState('');
    const [openJobDetail, setOpenJobDetail] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>(null);
    const [company, setCompany] = useState(false);
    const [openFilter, setOpenfilter] = useState(false);
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
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    const [allLoading, setAllLoading] = useState(false);
    const [applyEmp, setApplyEmp] = useState(false);
    const [jobTitle, setJobTitle] = useState('');



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
    const filData =
        data &&
        data.filter((item: any) => {
            let isMatch = true;
            const postedDate = new Date(item.datePosted);
            const now = new Date();
            const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
            const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);

            if (searchQuery.toLocaleLowerCase()) {
                const searchRegex = new RegExp(searchQuery, 'i');
                isMatch = isMatch && searchRegex.test(item.jobTitle);
            }
            if (addressHolder !== '' && address.toLocaleLowerCase()) {
                const searchRegex = new RegExp(addressHolder, 'i');
                isMatch = isMatch && searchRegex.test(item.jobLocation);
            }
            if (datePostedHolder !== 'Any time' && datePostedHolder !== '') {
                if (datePostedHolder == 'Past 24hrs') {
                    isMatch = isMatch && postedDate == new Date();
                }
                if (datePostedHolder == 'Past week') {
                    isMatch = isMatch && postedDate >= startOfWeek && postedDate <= endOfWeek;
                }
                if (datePostedHolder == 'Past month') {
                    isMatch = isMatch && postedDate >= thirtyDaysAgo && postedDate <= now;
                }
            }
            if (expLevelHolder !== '') {
                isMatch = isMatch && item.expreienceLevel == expLevelHolder;
            }
            if (jobTypeHolder !== '') {
                isMatch = isMatch && item.jobType == jobTypeHolder;
            }
            return isMatch;
        });

    const [filtered, setFiltered] = useState(data);
    const itemsPerPage = 8;
    const pageCount = filData && Math.ceil(filData.length / itemsPerPage);
    const currentData = filData && filData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const setTheSearchTerm = () => {
        typeof window !== 'undefined' && router.push({
            query: { param1: searchWord, param2: addressHolder }
        });
        setSearchQuery(searchWord);
        setAddress(addressHolder);
    };
    useEffect(() => {
        setAllLoading(true);
        fetchJobs().then((res) => {
            setData(res.documents);
            res.total !== 0 && setJobDetails(res.documents[0]);
            res.total !== 0 && setJobDetailId(res.documents[0].$id);
            filData && filData.length == 0 && setJobDetails(null)
            setAllLoading(false);
        });
        if (Object.keys(router.query).length > 0) {
            const { param1, param2 } = router.query;
            param1 && setSearchQuery(param1.toString());
            param1 && setSearchWord(param1.toString());
            param2 && setAddress(param2.toString());
            param2 && setAddressHolder(param2.toString());
        }
    }, [router.query]);
    const handleReset = () => {
        setDatePosted('');
        setExpLevel('');
        setJobType('');
        setSortBy('');
    };
    const handleFilter = () => {
        setDatePostedHolder(datePosted);
        setExpLevelHolder(expLevel);
        setJobTypeHolder(jobType);
    }
    const showPage = (page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        for (let i = 1; i <= filData.length; i++) {
            const item = document.getElementById(`item-${i}`);
            if (item) {
                item.style.display = i >= startIndex && i < endIndex ? 'grid' : 'none';
            }
        }
        setCurrentPage(page);
    };
    const changePage = (page: number) => {
        if (page > 0 && page <= pageCount) {
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
        if (currentPage < pageCount) {
            showPage(currentPage + 1);
        }
        setMaxPaginate(maxPaginate + 1);
        setMinPaginate(minPaginate + 1);
    };
    useEffect(() => {
        data && data.length !== 0 && setJobDetails(data.find((items: any) => items.$id == jobDetailId));
/*         filData && filData.length == 0 && setJobDetails(null)
 */    }, [jobDetailId]);
    useEffect(() => {
        if (searchQuery == '') {
            setFiltered(data);
        }
    }, [searchQuery]);
    const createCandidateAccount = () => {
        signOut()
            .then(() => {
                typeof window !== 'undefined' && router.push('/account');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="px-3 xl:px-40">
                <Navigation />
                {allLoading && <JobsShimmer />}
                {!allLoading && (
                    <div className="grid grid-cols-12 sm:gap-x-10 mt-8 md:mt-16">
                        <div className="col-span-12 grid grid-cols-12 gap-x-2 xl:gap-x-5">
                            <div className="col-span-12 flex flex-wrap gap-x-2 gap-y-4">
                                <div className={openJobDetail ? 'max-md:hidden w-full' : 'w-full'}>
                                    <SearchBar searchWord={searchWord}
                                        setSearchWord={setSearchWord}
                                        setOpenfilter={setOpenfilter}
                                        addressHolder={addressHolder}
                                        setAddressHolder={setAddressHolder}
                                        setTheSearchTerm={setTheSearchTerm}
                                        datePosted={datePostedHolder}
                                        expLevel={expLevelHolder}
                                        jobType={jobTypeHolder}
                                        setDatePosted={setDatePosted}
                                        setPostedDateHolder={setDatePostedHolder}
                                        setExpLevel={setExpLevel}
                                        setExpLevelHolder={setExpLevelHolder}
                                        setJobType={setJobType}
                                        setJobTypeHolder={setJobTypeHolder}
                                    />
                                </div>
                                <div className="w-full flex gap-5 p-3 pb-0 rounded-x-2xl">
                                    <div
                                        className={
                                            openJobDetail == true
                                                ? 'w-full hidden flex flex-col gap-y-3 max-h-[40rem] overflow-auto hideScrollBar md:flex md:w-1/2 lg:col-span-5 xl:w-2/5'
                                                : 'w-full flex flex-col max-h-[40rem] gap-y-3 overflow-auto hideScrollBar md:flex md:w-1/2 lg:col-span-5 xl:w-2/5'
                                        }
                                    >
                                        {currentData &&
                                            currentData.map((items: any, index: number) => {
                                                return <JobListCard items={items} key={index} jobDetailId={jobDetailId} setEmployerId={setEmployerId} setJobDetailId={setJobDetailId} setOpenJobDetail={setOpenJobDetail} />
                                            })}
                                    </div>
                                    <div
                                        className={
                                            openJobDetail == true
                                                ? 'max-md:w-full grid grid-cols-12 gap-x-5 xl:col-span-9 md:w-2/3 xl:w-3/5'
                                                : 'max-md:w-full grid grid-cols-12 gap-x-5 xl:col-span-9 md:w-2/3 xl:w-3/5 max-md:hidden'
                                        }
                                    >
                                        {jobDetails && <JobDetail datePostedHolder={datePostedHolder}
                                            setDatePosted={setDatePosted}
                                            setDatePostedHolder={setDatePostedHolder}
                                            expLevelHolder={expLevelHolder}
                                            setExpLevel={setExpLevel}
                                            setExpLevelHolder={setExpLevelHolder}
                                            jobTypeHolder={jobTypeHolder}
                                            setJobType={setJobType}
                                            setJobTypeHolder={setJobTypeHolder}
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
                                pageCount > 1
                                    ? openJobDetail
                                        ? 'col-span-3 flex justify-center items-center gap-x-3 mt-4 max-md:hidden'
                                        : 'flex justify-center items-center gap-x-3 mt-4 col-span-12 md:col-span-6 lg:col-span-3'
                                    : 'hidden'
                            }
                        >
                            <button
                                id="paginationBackWardButton"
                                name="paginationBackWardButton"
                                aria-labelledby="paginationBackWardButton"
                                className={
                                    maxPaginate > 5 && pageCount > 5
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
                                    onClick={() => changePage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                aria-labelledby="paginationForwardButton"
                                id="paginationForwardButton"
                                name="paginationForwardButton"
                                className={
                                    maxPaginate < pageCount
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
            </div>
            <Filter datePosted={datePosted} expLevel={expLevel} jobType={jobType} openFilter={openFilter} setOpenfilter={setOpenfilter}
                setDatePosted={setDatePosted}
                setExpLevel={setExpLevel}
                setJobType={setJobType}
                handleReset={handleReset}
                handleFilter={handleFilter}
            />
            <ConfirmModal isOpen={applyEmp} handleClose={() => setApplyEmp(!applyEmp)}>
                <div className="mx-2 pb-10 pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                    <div className="col-span-12 flex justify-end pr-7">
                        <button onClick={() => setApplyEmp(!applyEmp)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                    <div className="col-span-12 flex flex-col items-center justify-end pr-7 gap-3">
                        <p className="text-center md:px-10 text-bigS text-lightGrey">
                            Oops! You've set roots as an employer. To branch out and apply for jobs, consider a job seeker account.
                            <br /> Thanks.
                        </p>
                        <button
                            onClick={() => createCandidateAccount()}
                            type="button"
                            className="text-textW bg-gradient-to-r flex items-center justify-center from-gradientFirst to-gradientSecond h-16 w-full rounded-full md:w-1/2"
                        >
                            Create a candidate profile
                        </button>
                    </div>
                </div>
            </ConfirmModal>
        </>
    );
};
export default Jobs;
