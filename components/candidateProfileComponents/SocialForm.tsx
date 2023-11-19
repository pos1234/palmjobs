import React, { useEffect, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import TextInput, { SubmitButton } from '../TextInput'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { addSocials, getCandidateDocument, getUserDetail } from '@/lib/candidateBackend';
const SocialForm = (props: any) => {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [linked, setLinked] = useState('')
    const [linkedError, setLinkedError] = useState('')
    const [githubLink, setGithubLink] = useState('')
    const [githubError, setGithubError] = useState('')
    const [behan, setBehan] = useState('');
    const [behanceError, setBehanceError] = useState('')
    const [portfolio, setPortfolio] = useState('');
    const [portfolioError, setPortfolioError] = useState('');
    const [loading, setLoading] = useState(false)
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    const hanleLinkUpdate = (e: React.FormEvent<HTMLElement>) => {
        const linkText = 'Invalid Url';
        e.preventDefault();
        setGithubError('');
        setLinkedError('');
        setBehanceError('');
        setPortfolioError('');
        if (linked !== '' && !isValidUrl(linked)) {
            setLinkedError(linkText);
        } else if (githubLink !== '' && !isValidUrl(githubLink)) {
            setGithubError(linkText);
        } else if (behan !== '' && !isValidUrl(behan)) {
            setBehanceError(linkText);
        } else if (portfolio !== '' && !isValidUrl(portfolio)) {
            setPortfolioError(linkText);
        } else {
            setLoading(true);
            addSocials(linked, githubLink, behan, portfolio, phone, address)
                .then((res) => {
                    setLoading(false);
                    toast.success('Saved Successfully');
                    props.setOpenProfile(!props.openProfile)
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Not Saved Successfully');
                    setLoading(false);
                });
        }
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        if (userInfo) {
            userInfo.linkedIn && setLinked(userInfo.linkedIn)
            userInfo.github && setGithubLink(userInfo.github)
            userInfo.behance && setBehan(userInfo.behance)
            userInfo.protfolio && setPortfolio(userInfo.protfolio)
            userInfo.address && setAddress(userInfo.address)
            userInfo.phoneNumber && setPhone(userInfo.phoneNumber)
        }

    }
    useEffect(() => {
        userData()
    }, [])

    return (
        <ConfirmModal isOpen={props.openProfile} handleClose={() => props.setOpenProfile(false)}>
            <div className="mx-2 h-[80%] w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 pb-14 md:pt-8 md:h-auto md:pl-14 md:w-2/3 lg:w-1/2 md:mx-0">
                <div className="col-span-12 order-1 grid grid-cols-12 max-sm:pr-4">
                    <div className="col-span-11">
                        <p className="font-[600] text-2xl leading-shL pb-5 ">Bio</p>
                        <form className="col-span-12 grid grid-cols-12" onSubmit={hanleLinkUpdate}>
                            <p className='col-span-12 font-[500] mb-5'>Let's get started with some personal details</p>
                            <div className="col-span-12 flex gap-3 h-[100%] grid grid-cols-1 md:grid-cols-2">
                                <div className="flex flex-col gap-3">
                                    <p className="font-fhW w-full text-smS leading-shL">Phone</p>
                                    <TextInput
                                        placeHolder="Phone"
                                        value={phone}
                                        setFunction={setPhone}
                                        class="full"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="w-full font-fhW text-smS leading-shL">Address</p>
                                    <TextInput
                                        class="full"
                                        placeHolder="Address"
                                        value={address}
                                        setFunction={setAddress}
                                    />
                                </div>
                            </div>
                            <div className='col-span-12 font-[500] my-5 text-[24px]'>Your online profiles</div>
                            <div className="col-span-12 flex gap-3 h-[100%] grid grid-cols-1 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <p className="font-fhW w-full flex gap-1 items-center text-smS leading-shL">
                                        <span className='text-gradientFirst'>
                                            <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
                                        </span>
                                        LinkedIn</p>
                                    <TextInput
                                        errorMessage={linkedError}
                                        placeHolder="Behance Link"
                                        value={linked}
                                        setFunction={setLinked}
                                        class="full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="w-full font-fhW text-smS flex items-center gap-1 leading-shL">
                                        <span className='text-gradientFirst'>
                                            <GitHubIcon sx={{ fontSize: '1.2rem' }} />
                                        </span>
                                        Github</p>
                                    <TextInput
                                        class="full"
                                        placeHolder="Behance Link"
                                        value={githubLink}
                                        setFunction={setGithubLink}
                                        errorMessage={githubError}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="w-full font-fhW text-smS flex items-center gap-1 leading-shL">
                                        <span className='text-gradientFirst'>
                                            Be
                                        </span>
                                        Behance</p>
                                    <TextInput
                                        placeHolder="Behance Link"
                                        value={behan}
                                        errorMessage={behanceError}
                                        setFunction={setBehan}
                                        class="full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="w-full font-fhW text-smS flex items-center gap-1 leading-shL">
                                        <span className='text-gradientFirst'>
                                            <LanguageIcon sx={{ fontSize: '1.2rem' }} />
                                        </span>
                                        Portfolio</p>
                                    <TextInput
                                        class="full"
                                        placeHolder="Portfolio Link"
                                        value={portfolio}
                                        setFunction={setPortfolio}
                                        errorMessage={portfolioError}
                                    />
                                </div>
                            </div>
                            <div className='col-span-12 mt-10 w-full flex md:justify-end'>
                                <div className='w-full md:w-60'>
                                    <SubmitButton loading={loading} buttonText="Save" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-1 order-2 md:order-3 md:col-span-1">
                        <button onClick={() => props.setOpenProfile(false)}>
                            <CloseIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-8 h-8 p-2 "
                            />
                        </button>
                    </div>
                </div>
            </div>
        </ConfirmModal>
    )
}

export default SocialForm