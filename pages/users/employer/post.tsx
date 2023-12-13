import { useState, useEffect } from 'react';
import { fetchAllEmployerJob, getProfileData } from '@/backend/employerBackend';
import 'react-quill/dist/quill.snow.css';
import EmployerProfile from '@/components/employerComponents/Profile';
import FirstForm from '@/components/employerComponents/jobPostTabs/FirstForm';
import SecondForm from '@/components/employerComponents/jobPostTabs/SecondForm';
import ThirdForm from '@/components/employerComponents/jobPostTabs/ThirdForm';
import FourthForm from '@/components/employerComponents/jobPostTabs/FourthForm';
import PreviewJob from '@/components/employerComponents/jobPostTabs/PreviewJob';
import { useJobPostContext } from '@/contextApi/jobPostData';
import ChooseJob from '@/components/employerComponents/jobPostTabs/ChooseJob';
import Navigation from '@/components/employerComponents/Navigation';
import { employeeAuth } from '@/components/withAuth';
import { useGlobalContext } from '@/contextApi/userData';
import EmployerJobShimmer from '@/components/shimmer/EmpJobShimmer';
const PostAJob = (props: any) => {
    const { jobPostTabs, allLoading } = useJobPostContext();
    const { userDetail } = useGlobalContext()
    const [compDesc, setCompDesc] = useState('');
    const [openPreview, setOpenPreview] = useState(false);
    const [profileFilled, setProfileFilled] = useState(true);
    const [companyData, setCompanyData] = useState<any>()
    const getProfile = async () => {
        if (userDetail) {
            if (
                userDetail.location == null ||
                userDetail.phoneNumber == null ||
                userDetail.description == null ||
                userDetail.companyName == null
            ) {
                if (jobPostTabs.third == true) {
                    setProfileFilled(false);
                }
            }
        }
    };
    /* useEffect(() => {
        if (!allEmployerJobs) {
            setAllLoading(true)
            fetchAllEmployerJob().then((res: any) => {
                if (res?.total > 0) {
                    setPostingTabs({
                        ...jobPostTabs,
                        chooseJob: true
                    })
                }
                if (res?.total == 0) {
                    setPostingTabs({
                        ...jobPostTabs,
                        first: true
                    })
                }
                setAllLoading(false)
                setAllEmployerJobs(res?.documents)
            }).catch((error) => {
                setAllLoading(false)
                console.log(error);
            })
        }
    }, []) */
    useEffect(() => {
        getProfile();
    }, [userDetail, jobPostTabs])

    return (
        <div className="flex gap-x-3 max-md:flex-wrap bg-textW">
            <Navigation active='post' />
            <div className="pt-5 px-3 pb-10 bg-textW w-full max-xl:flex-grow xl:w-2/3 min-h-screen">
                {allLoading && (
                    <div className="flex flex-col gap-y-10 pt-20 h-full">
                        <EmployerJobShimmer />
                        <EmployerJobShimmer />
                        <EmployerJobShimmer />
                        <EmployerJobShimmer />
                    </div>
                )}
                {jobPostTabs.chooseJob == false && (jobPostTabs.first || jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth) && <p className="text-neutral-900 text-opacity-70 text-base font-normal leading-10">Job Post Progress</p>}
                {jobPostTabs.chooseJob == false && (jobPostTabs.first || jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth) && (
                    <div className="grid grid-cols-12 gap-x-2 mt-1 md:pr-20 lg:pr-40 xl:pr-60">
                        <div className="rounded-2xl bg-gradientFirst h-1.5 col-span-3"></div>
                        <div
                            className={
                                jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth
                                    ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                                    : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                            }
                        ></div>
                        <div
                            className={
                                jobPostTabs.third || jobPostTabs.fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                            }
                        ></div>
                        <div
                            className={jobPostTabs.fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'}
                        ></div>
                    </div>
                )}
                <div className={jobPostTabs.chooseJob ? '' : 'hidden'}>
                    <ChooseJob />
                </div>
                <div className={jobPostTabs.first == true ? '' : 'hidden'}>
                    <FirstForm />
                </div>
                <div className={jobPostTabs.second == true ? '' : 'hidden'} >
                    <SecondForm />
                </div>
                <div className={jobPostTabs.third == true && profileFilled == true ? '' : 'hidden'}>
                    <ThirdForm />
                </div>
                <div className={jobPostTabs.fourth == true ? '' : 'hidden'}>
                    <FourthForm setOpenPreview={setOpenPreview} />
                </div>
                {!profileFilled && <EmployerProfile setFilled={setProfileFilled} />}
                <PreviewJob openModal={openPreview} setOpenModal={setOpenPreview} companyData={companyData}
                />
            </div>
        </div>
    );
}
export default employeeAuth(PostAJob);
