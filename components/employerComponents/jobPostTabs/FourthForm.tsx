import { SendJobPostedEmail } from '@/components/SendEmail';
import { getAccount } from '@/backend/accountBackend';
import { postFourthTab } from '@/backend/employerBackend';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { RequiredTextLabel } from './RequiredTextLabel';
import TextInput, { SubmitButton, TextInputRelated } from '@/components/TextInput';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useJobPostContext } from '@/contextApi/jobPostData';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const FourthForm = (props: any) => {
    const { firstTabData, fourthTabData, setFourthTabData } = useJobPostContext()
    const router = useRouter();
    const today = new Date();
    const todaysDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);
    const validateLink = (link: string) => {
        if (link && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
        return link;
    };
    /*  useEffect(() => {
         if (props.editedData) {
             if (props.editedData.emailApplication) {
                 setPalm(false);
                 setEmail(true);
                 setLink(false);
                 props.editedData.emailApplication && setEmailSent(props.editedData.emailApplication);
             }
             if (props.editedData.externalLink) {
                 setPalm(false);
                 setEmail(false);
                 setLink(true);
                 props.editedData.externalLink && setExternalLink(props.editedData.externalLink);
             }
         }
     }, [props.editedData]) */
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
            postFourthTab(props.postingJobId, fourthTabData.deadline, '', fourthTabData.emailSent, validateLink(fourthTabData.externalLink))
                .then((res: any) => {
                    setFourthTabData({
                        ...fourthTabData, loading: false
                    })
                    toast.success('Job posted successfully');
                    getAccount().then((result: any) => {
                        result &&
                            fourthTabData.emailNotify !== 'false' &&
                            SendJobPostedEmail(result.email, firstTabData.jobTitle, `${VERIFY}/jobs/${res.$id}`, result.name);
                    });
                    typeof window !== 'undefined' && router.push(`/jobs/${res.$id}`);
                })
                .catch((error) => {
                    setFourthTabData({
                        ...fourthTabData, loading: false
                    })
                    toast.error('Job not posted');
                    console.log(error);
                });
        }
    };
    return (
        <form
            onSubmit={handleFourthSubmit}
            className={props.fourth ? 'col-span-12 pt-5  space-y-3 ' : 'hidden'}
        >
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
                            ...fourthTabData, palm: false,
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
                        dataDistruct={fourthTabData} change={'email'}
                    />
                    <p className="text-red-500 text-[13px]">{fourthTabData.emailError}</p>
                </>
            )}
            {fourthTabData.link && (
                <>
                    <RequiredTextLabel text="External Link" />
                    <TextInputRelated placeHolder="External Link" value={fourthTabData.externalLink} setFunction={setFourthTabData}
                        dataDistruct={fourthTabData} change={'link'} />
                    <p className="text-red-500 text-[13px]">{fourthTabData.linkError}</p>
                </>
            )}
            <div className="flex flex-col pt-2 gap-y-4 pb-7">
                <RequiredTextLabel text="Closing Date" req="nReq" />
                <input
                    value={fourthTabData.deadline}
                    type="date"
                    min={todaysDate.toISOString().split('T')[0]}
                    max={maxDate.toISOString().split('T')[0]}
                    onChange={(e) => setFourthTabData({ ...fourthTabData, deadline: e.currentTarget.value })}
                    className="rounded-xl  border-stone-300 py-3 cursor-pointer focus:border-orange-500 focus:ring-0 w-full px-20 md:px-28 md:w-96"
                />
            </div>
            <div className="flex pt-10 max-md:flex-col max-md:gap-y-8 gap-y-5 flex-wrap justify-between">
                <div className="w-full">
                    <div
                        onClick={() => props.setOpenPreview(true)}
                        className={
                            props.fourth
                                ? 'text-gradientFirst border flex items-center justify-center cursor-pointer h-14 rounded-xl w-full block  md:w-5/12 lg:w-60'
                                : 'hidden'
                        }
                    >
                        See Preview &nbsp; <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                    </div>
                </div>
                <div
                    onClick={props.handleBack}
                    className={
                        props.second || props.third || props.fourth
                            ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-14 rounded-xl max-md:order-3 w-full md:w-5/12 lg:w-60'
                            : 'opacity-0'
                    }
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div className="flex justify-end">
                    <div className='w-full col-span-12 flex md:justify-end'>
                        <div className='w-full md:w-60'>
                            <SubmitButton loading={fourthTabData.loading} buttonText="Post Job" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FourthForm