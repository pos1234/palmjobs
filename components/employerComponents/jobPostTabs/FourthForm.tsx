import { SendJobPostedEmail } from '@/components/SendEmail';
import { getAccount } from '@/lib/accountBackend';
import { postFourthTab } from '@/lib/employerBackend';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { RequiredTextLabel } from './RequiredTextLabel';
import TextInput, { SubmitButton } from '@/components/TextInput';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const FourthForm = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const today = new Date();
    const fifteenthDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    const [deadline, setDeadline] = useState(`${fifteenthDay}`);
    const [palm, setPalm] = useState(true);
    const [email, setEmail] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [link, setLink] = useState(false);
    const [linkError, setLinkError] = useState('');
    const [emailNotify, setEmailNotify] = useState('');
    const todaysDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);

    const validateLink = (link: string) => {
        if (link && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
        return link;
    };
    useEffect(() => {
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
    }, [props.editedData])
    const handleFourthSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (email && emailSent == '') {
            setEmailError('please provide email address');
        } else if (link && externalLink == '') {
            setLinkError('please provide link');
        } else {
            setLoading(true);
            postFourthTab(props.postingJobId, deadline, '', emailSent, validateLink(externalLink))
                .then((res: any) => {
                    setLoading(false);
                    toast.success('Job posted successfully');
                    getAccount().then((result: any) => {
                        result &&
                            emailNotify !== 'false' &&
                            SendJobPostedEmail(result.email, /* jobTitle, */'', `${VERIFY}/jobs/${res.$id}`, result.name);
                    });
                    typeof window !== 'undefined' && router.push(`/jobs/${res.$id}`);
                })
                .catch((error) => {
                    setLoading(false);
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
            <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">Set application Preference</div>
            <div className="flex bg-forBack w-full p-2 gap-x-5 md:w-1/2">
                <div
                    title="Recieve Application Through Palmjobs"
                    onClick={() => {
                        setPalm(true);
                        setEmail(false);
                        setLink(false);
                    }}
                    className={
                        palm
                            ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor hover:text-gradientFirst flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20 text-stone-400'
                    }
                >
                    <ArticleIcon className="-ml-0.5" />
                    <p className="absolute bottom-1">Palm Jobs</p>
                </div>
                <div
                    title="Recieve Application Through Email"
                    onClick={() => {
                        setPalm(false);
                        setEmail(true);
                        setLink(false);
                    }}
                    className={
                        email
                            ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor hover:text-gradientFirst text-stone-400 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                    }
                >
                    <AlternateEmailIcon className="-ml-2" />
                    <p className="absolute bottom-1">Email</p>
                </div>
                <div
                    title="Recieve Application Through External Link"
                    onClick={() => {
                        setPalm(false);
                        setEmail(false);
                        setLink(true);
                    }}
                    className={
                        link
                            ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor text-stone-400 hover:text-gradientFirst flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                    }
                >
                    <InsertLinkIcon className="-ml-2" />
                    <p className="absolute bottom-1">External Link</p>
                </div>
            </div>
            {email && (
                <>
                    <RequiredTextLabel text="Email" />
                    <TextInput placeHolder="Email Address" value={emailSent} setFunction={setEmailSent} />
                    <p className="text-red-500 text-[13px]">{emailError}</p>
                </>
            )}
            {link && (
                <>
                    <RequiredTextLabel text="External Link" />
                    <TextInput placeHolder="External Link" value={externalLink} setFunction={setExternalLink} />
                    <p className="text-red-500 text-[13px]">{linkError}</p>
                </>
            )}
            <div className="flex flex-col pt-2 gap-y-4 pb-7">
                <RequiredTextLabel text="Closing Date" req="nReq" />
                <input
                    value={deadline}
                    type="date"
                    min={todaysDate.toISOString().split('T')[0]}
                    max={maxDate.toISOString().split('T')[0]}
                    onChange={(e) => setDeadline(e.currentTarget.value)}
                    className="rounded-xl  border-stone-300 py-3 cursor-pointer focus:border-orange-500 focus:ring-0 w-full px-20 md:px-28 md:w-96"
                />
            </div>
            <div className="flex pt-10 max-md:flex-col max-md:gap-y-8 gap-y-5 flex-wrap justify-between">
                <div className="w-full">
                    <div
                        onClick={() => props.setOpenPreview(true)}
                        className={
                            props.fourth
                                ? 'text-gradientFirst border flex items-center justify-center cursor-pointer h-16 rounded-xl w-full block  md:w-5/12 lg:w-3/12'
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
                            ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 rounded-xl max-md:order-3 w-full md:w-5/12 lg:w-3/12'
                            : 'opacity-0'
                    }
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div className="flex justify-end">
                    <div className='w-full col-span-12 flex md:justify-end'>
                        <div className='w-full md:w-80'>
                            <SubmitButton loading={loading} buttonText="Post Job" />
                        </div>
                    </div>
                </div>
                {/* {loading && (
                    <img
                        src={loadingIn}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-xl max-md:order-1 w-full md:w-5/12 lg:w-3/12"
                    />
                )}
                {!loading && (
                    <button
                        type="submit"
                        className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl max-md:order-1 w-full md:w-5/12 lg:w-3/12"
                    >
                        Post Job
                    </button>
                )} */}
            </div>
        </form>
    )
}

export default FourthForm