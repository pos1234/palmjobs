import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import EditIcon from '@mui/icons-material/Edit';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { addPhoneAddress, getUserDetail } from '@/backend/candidateBackend';
import { toast } from 'react-toastify';
import SocialForm from './SocialForm';
import { useGlobalContext } from '@/contextApi/userData';
const SocialLinks = (props: any) => {
    const { userDetail } = useGlobalContext()
    const [locate, setLocate] = useState('')
    const [call, setCall] = useState('');
    const [linked, setLinked] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [behan, setBehan] = useState('');
    const [portfolio, setPortfolio] = useState('')
    const [openSocial, setOpenSocial] = useState(false)
    const handlePhoneLocation = () => {
        if (call !== '' || locate !== "") {
            addPhoneAddress(call, locate).then(res => {
                toast.success('Successfull Updated')
            })
                .catch((erorr) => {
                    toast.error(`Not Updated ${erorr}`)
                })
        }

    };
    const userData = async () => {
/*         const userInfo = await getUserDetail()
 */        if (userDetail) {
            userDetail.linkedIn && setLinked(userDetail.linkedIn)
            userDetail.github && setGithubLink(userDetail.github)
            userDetail.behance && setBehan(userDetail.behance)
            userDetail.protfolio && setPortfolio(userDetail.protfolio)
            userDetail.address && setLocate(userDetail.address)
            userDetail.phoneNumber && setCall(userDetail.phoneNumber)
        }

    }
    useEffect(() => {
        userData()
    }, [userDetail])
    return (
        <>
            <div className="font-midRW text-midRS justify-center leading-midRL text-lightGrey flex flex-col gap-y-4 mt-2">
                {/*  <div className="flex items-center border-[1px] rounded-xl bg-textW">
                    <span className="w-5 h-5 text-stone-400 z-[2] pl-3">
                        <FmdGoodOutlinedIcon className="-mt-[4px]" />
                    </span>
                    <div className="-ml-5 z-[1] rounded-xl w-full pl-10 py-3 group border-stone-200 focus:ring-gradientSecond focus:outline-0 focus:border-0 "
                    >
                        {locate}
                    </div>
                </div>
                <div className="flex items-center border-[1px] rounded-xl bg-textW">
                    <span className="w-5 h-5 text-stone-400 z-[2] pl-3">
                        <PhoneIphoneOutlinedIcon className="-mt-[4px]" />
                    </span>
                    <div

                        className="-ml-5 z-[1] rounded-xl w-full pl-10 py-3 group border-stone-200 focus:ring-gradientSecond focus:outline-0 focus:border-0 "

                    >
                        {call}
                    </div>
                </div> */}
                <div>
                    <p className='font-[500] text-xl'>Bio</p>
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
                            onClick={() => setOpenSocial(true)}
                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                            className="w-5 h-5 p-1 ml-2 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <SocialForm openProfile={openSocial} setOpenProfile={setOpenSocial} />

        </>
    )
}

export default SocialLinks