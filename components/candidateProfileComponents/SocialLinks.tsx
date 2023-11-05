import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import EditIcon from '@mui/icons-material/Edit';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { addPhoneAddress, getUserDetail, insertCoverLetter } from '@/lib/candidateBackend';
import { toast } from 'react-toastify';
const SocialLinks = (props: any) => {
    const [locate, setLocate] = useState('')
    const [call, setCall] = useState('');
    const [linked, setLinked] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [behan, setBehan] = useState('');
    const [portfolio, setPortfolio] = useState('')
    const [coverLetter, setCoverLetter] = useState('');
    const coverLetterLength = 800
    const handleCoverLetter = () => {
        insertCoverLetter(coverLetter).then((res) => {
            toast.success('Updated Successfully')
        }).catch((erorr) => {
            toast.error(`Not Updated ${erorr}`)
        })
    }
    const handlePhoneLocation = () => {
        addPhoneAddress(call, locate).then(res => {
            toast.success('Successfull Updated')
        })
            .catch((erorr) => {
                toast.error(`Not Updated ${erorr}`)
            })
    };
    const removeHtmlTags = (html: string) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, '');
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        userInfo.linkedIn && setLinked(userInfo.linkedIn)
        userInfo.github && setGithubLink(userInfo.github)
        userInfo.behance && setBehan(userInfo.behance)
        userInfo.protfolio && setPortfolio(userInfo.protfolio)
        userInfo.address && setLocate(userInfo.address)
        userInfo.phoneNumber && setCall(userInfo.phoneNumber)
        userInfo.coverLetter && setCoverLetter(userInfo.coverLetter)
    }
    useEffect(() => {
        userData()
    }, [])
    return (
        <>
            <div className="col-span-12 max-md:mt-3 md:col-span-8 sm:max-md:px-40 lg:pl-5 xl:pl-3">
                <div className="font-midRW text-midRS leading-midRL text-lightGrey flex flex-col gap-y-4 mt-2">
                    <div className="flex items-center">
                        <span className="w-5 h-5 text-stone-400 z-[2] pl-3">
                            <FmdGoodOutlinedIcon className="-mt-[4px]" />
                        </span>
                        <input
                            placeholder="Enter Address"
                            type="text"
                            className="-ml-5 z-[1] rounded-xl w-full pl-10 py-3 group border-stone-200 focus:ring-gradientSecond focus:outline-0 focus:border-0 "
                            value={locate}
                            onChange={(e) => {
                                if (e.currentTarget.value.length <= 50) {
                                    setLocate(e.currentTarget.value);
                                }
                            }}
                            onBlur={handlePhoneLocation}
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="w-5 h-5 text-stone-400 z-[2] pl-3">
                            <PhoneIphoneOutlinedIcon className="-mt-[4px]" />
                        </span>
                        <input
                            placeholder="Enter phone number"
                            type="text"
                            className="-ml-5 z-[1] rounded-xl w-full pl-10 py-3 group border-stone-200 focus:ring-gradientSecond focus:outline-0 focus:border-0 "
                            value={call}
                            onChange={(e) => {
                                if (e.currentTarget.value.length <= 10) {
                                    setCall(e.currentTarget.value);
                                }
                            }}
                            onBlur={handlePhoneLocation}
                        />
                    </div>
                    <div className="flex gap-x-5 text-[#618c61]">
                        {linked && (
                            <Link target="_blank" title="linkedIn" href={linked}>
                                <LinkedInIcon className="w-7 h-7 hover:text-[#00A82D]" />
                            </Link>
                        )}
                        {githubLink && (
                            <Link target="_blank" title="github" href={githubLink}>
                                <GitHubIcon className="w-7 h-7 hover:text-[#00A82D]" />
                            </Link>
                        )}
                        {behan && (
                            <Link target="_blank" title="behance" href={behan}>
                                <FormatBoldIcon className="w-8 h-8 hover:text-[#00A82D]" />
                            </Link>
                        )}
                        {portfolio && (
                            <Link target="_blank" title="portifolio" href={portfolio}>
                                <PhonelinkIcon className="w-7 h-7 hover:text-[#00A82D]" />
                            </Link>
                        )}
                        <div title='Edit Social Links'>
                            <EditIcon
                                onClick={() => props.setOpenProfile(true)}
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-5 h-5 p-1 ml-2 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="border-2 rounded-2xl p-2 pb-5 pr-0 flex-grow max-sm:h-60">
                <div className='flex justify-between'>
                    <p className="font-shW text-midS leading-shL">Cover Letter</p>
                    <p className='mr-5 text-fadedText'>{`${coverLetter.length} / ${coverLetterLength}`}</p>
                </div>
                <textarea
                    style={{ resize: 'none' }}
                    className="border-0 focus:border-0 focus:ring-0 h-full max-h-[80%] w-full overflow-y-auto overflow-x-hidden"
                    value={coverLetter ? removeHtmlTags(coverLetter) : ''}
                    onChange={(e) => {
                        if (removeHtmlTags(e.currentTarget.value).length <= coverLetterLength) {
                            setCoverLetter(e.currentTarget.value)
                        }
                    }}
                    onBlur={handleCoverLetter}
                />
            </div></>
    )
}

export default SocialLinks