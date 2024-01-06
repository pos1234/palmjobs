import { SendJobPostedEmail } from '@/components/SendEmail';
import { getAccount } from '@/backend/accountBackend';
import { fetchAllEmployerJob, getPaymentDetail, postFourthTab, setPaymentDetail } from '@/backend/employerBackend';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { RequiredTextLabel } from './RequiredTextLabel';
import { SubmitButton, TextInputRelated } from '@/components/TextInput';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useJobPostContext } from '@/contextApi/jobPostData';
import Modal from '@/components/Modal';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const FourthForm = (props: any) => {
    const { firstTabData, fourthTabData, setFourthTabData, postingJobId, jobPostTabs, setPostingTabs, setAllEmployerJobs, handleDiscard } = useJobPostContext()
    const [pay, setPay] = useState(false);
    const router = useRouter();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    const todaysDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);
    const validateLink = (link: string) => {
        if (link && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
        return link;
    };
    const handleFourthSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (fourthTabData.email && fourthTabData.emailSent == '') {
            setFourthTabData({
                ...fourthTabData, emailError: 'please provide email address'
            })
        } else if (fourthTabData.link && fourthTabData.externalLink == '') {
            setFourthTabData({
                ...fourthTabData, linkError: 'please provide link'
            })
        } else {
            setFourthTabData({
                ...fourthTabData, loading: true
            })
            getPaymentDetail().then((res) => {
                if (res?.total == 0) {
                    setPay(true);
                    setFourthTabData({
                        ...fourthTabData, loading: false
                    })
                }
                if (res?.total !== 0) {
                    postFourthTab(postingJobId, fourthTabData.deadline, '', fourthTabData.emailSent, validateLink(fourthTabData.externalLink))
                        .then((rem: any) => {
                            setPaymentDetail(res?.documents[0].$id as string, res?.documents[0].remainingJobPosts, res?.documents[0].remainingJobsPerDay).then(res => {
                                setFourthTabData({
                                    ...fourthTabData, loading: false
                                })
                                setPostingTabs({
                                    ...jobPostTabs,
                                    chooseJob: true,
                                    fourth: false
                                })
                                fetchAllEmployerJob().then((rem: any) => {
                                    setAllEmployerJobs(rem?.documents)
                                }).catch((error) => {
                                    console.log(error);
                                })
                                toast.success('Job posted successfully');
                                getAccount().then((result: any) => {
                                    result &&
                                        fourthTabData.emailNotify !== 'false' && SendJobPostedEmail(result.email, firstTabData.jobTitle, `${VERIFY}/jobs/${rem.$id}`, result.name);
                                });
                                typeof window !== 'undefined' && router.push(`/jobs/${rem.$id}`);
                            })
                        })
                        .catch((error) => {
                            setFourthTabData({
                                ...fourthTabData, loading: false
                            })
                            toast.error('Job not posted');
                            console.log(error);
                        });
                }
            })

        }
    };
    const handleBack = () => {
        setPostingTabs({
            ...jobPostTabs,
            fourth: false,
            third: true
        })
    }

    return (
        <>
            <Modal openModal={pay} modalTitle={'Payment'} setOpenModal={setPay}>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-center gap-y-5 items-center w-full flex-col">
                        <img src="/images/undraw_time_management_re_tk5w.svg" className='w-40 h-40' alt="clock image" />
                    </div>
                    <div className="flex justify-center gap-y-3 items-center w-full flex-col">
                        <p className='font-[600] text-xl'>Your 30-day trial has ended</p>
                        <p> But it's not too late to take the next step. <br /> Upgrade to a paid plan to keep posting jobs.
                        </p>
                        <p>
                            Contact this number +251 9123456
                        </p>
                        <p>
                            CBE Account Number 01234567
                        </p>

                    </div>
                </div>
            </Modal>
            <form onSubmit={handleFourthSubmit} className='col-span-12 pt-5  space-y-3'>
                <div className="text-neutral-900 text-xl font-semibold leading-10">Set application Preference</div>
                <div className="flex bg-forBack w-full p-2 gap-x-5 md:w-1/2">
                    <div
                        title="Recieve Application Through Palmjobs"
                        onClick={() => {
                            setFourthTabData({
                                ...fourthTabData, palm: true,
                                email: false,
                                link: false
                            })
                        }}
                        className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${fourthTabData.palm ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}

                    >
                        <ArticleIcon className="-ml-0.5" />
                        <p>Palm Jobs</p>
                    </div>
                    <div
                        title="Recieve Application Through Email"
                        onClick={() => {
                            setFourthTabData({
                                ...fourthTabData, palm: false,
                                email: true,
                                link: false
                            })
                        }}
                        className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${fourthTabData.email ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}

                    >
                        <AlternateEmailIcon className="-ml-2" />
                        <p>Email</p>
                    </div>
                    <div
                        title="Recieve Application Through External Link"
                        onClick={() => {
                            setFourthTabData({
                                ...fourthTabData,
                                palm: false,
                                email: false,
                                link: true
                            })
                        }}
                        className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${fourthTabData.link ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
                    >
                        <InsertLinkIcon className="-ml-2" />
                        <p>External Link</p>
                    </div>
                </div>
                {fourthTabData.email && (
                    <>
                        <RequiredTextLabel text="Email" />
                        <TextInputRelated placeHolder="Email Address" value={fourthTabData.emailSent} setFunction={setFourthTabData}
                            dataDistruct={fourthTabData} change={'emailSent'}
                        />
                        <p className="text-red-500 text-[13px]">{fourthTabData.emailError}</p>
                    </>
                )}
                {fourthTabData.link && (
                    <>
                        <RequiredTextLabel text="External Link" />
                        <TextInputRelated placeHolder="External Link" value={fourthTabData.externalLink} setFunction={setFourthTabData}
                            dataDistruct={fourthTabData} change={'externalLink'} />
                        <p className="text-red-500 text-[13px]">{fourthTabData.linkError}</p>
                    </>
                )}
                <div className="flex flex-col pt-2 gap-y-4 pb-7">
                    <RequiredTextLabel text="Closing Date" req="nReq" />
                    <input
                        value={fourthTabData.deadline}
                        type="date"
                        min={minDate}
                        max={maxDate.toISOString().split('T')[0]}
                        onChange={(e) => setFourthTabData({ ...fourthTabData, deadline: e.currentTarget.value })}
                        className="rounded-xl  border-stone-300 py-3 cursor-pointer focus:border-gradientFirst focus:ring-0 w-full px-20 md:px-28 md:w-96"
                    />
                </div>
                <div className="flex pt-10 max-md:flex-col max-md:gap-y-8 gap-y-5 flex-wrap justify-between">
                    <div className="w-full">
                        <div
                            onClick={() => props.setOpenPreview(true)}
                            className='text-gradientFirst border flex items-center justify-center cursor-pointer h-14 rounded-xl w-full block  md:w-5/12 lg:w-60'                   >
                            See Preview &nbsp; <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                        </div>
                    </div>
                    <div className="w-full flex pt-10 justify-between gap-5 max-sm:flex-wrap">
                        <div onClick={handleBack} className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-[#FAFAFA] h-14'>
                            <ArrowBackIcon sx={{ fontSize: '1rem' }} /> <span className='ml-2'>Back</span>
                        </div>
                        <div onClick={handleDiscard} className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-[#FAFAFA] h-14'>
                            Discard
                        </div>
                        <div className='w-full md:w-60 rounded-lg bg-black'>
                            <button disabled={fourthTabData.loading ? true : false} type="submit" className="bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] w-full rounded-lg text-textW h-14 buttonBounce">
                                {fourthTabData.loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>}
                                {fourthTabData.loading && <span>Loading...</span>}
                                {!fourthTabData.loading && <span>Post Job</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FourthForm