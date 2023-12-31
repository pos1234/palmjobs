import React, { useEffect, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import TextInput, { SubmitButton } from '../TextInput'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { addSocials } from '@/backend/candidateBackend';
import { updateUserName } from '@/backend/employerBackend';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import FormModal from './FormModal';
import Modal from '../Modal';
const SocialForm = (props: any) => {
    /*     const { userData, userDetail } = useGlobalContext()
     */
    const [userData, setUserData] = useState<any>()
    const [userDetail, setUserDetail] = useState<any>(props.userDetail)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [phone, setPhone] = useState<any>()
    const [phoneError, setPhoneError] = useState('')
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
    const isValidPhone = (phones: string) => {
        const result = phones && isValidPhoneNumber(phones.toString())
        return result
    }
    const updateLocal = (linkedValue: any, githubLinkValue: any, behanValue: any, portfolioValue: any, phoneValue: any, addressValue: any) => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail')
                    .then((existingData: any) => {
                        // Modify the existing data
                        const updatedData = {
                            // Update the specific properties you want to change
                            ...existingData,
                            linkedIn: linkedValue,
                            github: githubLinkValue,
                            behance: behanValue,
                            protfolio: portfolioValue,
                            phoneNumber: phoneValue,
                            address: addressValue
                        };

                        // Set the updated data back to the same key
                        return localforage.setItem('userDetail', updatedData);
                    })
                    .then(() => {
                    })
                    .catch((err) => {
                        console.error(`Error updating item: ${err}`);
                    });
            });
        }
    }
    const hanleLinkUpdate = (e: React.FormEvent<HTMLElement>) => {
        setNameError(false)
        const linkText = 'Invalid Url';
        e.preventDefault();
        setGithubError('');
        setLinkedError('');
        setBehanceError('');
        setPortfolioError('');
        setPhoneError('');
        if (name == '') {
            setNameError(true)
        } else if (phone && !isValidPhone(phone)) {
            setPhoneError('Ivalid phone');
        } else if (linked !== '' && !isValidUrl(linked)) {
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
                    updateUserName(name).then((res) => {
                        setLoading(false);
                        toast.success('Saved Successfully');
                        props.setOpenProfile(!props.openProfile)
                        updateLocal(linked, githubLink, behan, portfolio, phone, address)
                    }).catch((error) => {
                        console.log(error);
                        toast.error('Not Saved Successfully');
                        setLoading(false);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Not Saved Successfully');
                    setLoading(false);
                });
        }
    };
    const userDatas = async () => {
        /* const userInfo = await getUserDetail() */
        if (userDetail) {
            userDetail.linkedIn && setLinked(userDetail.linkedIn)
            userDetail.github && setGithubLink(userDetail.github)
            userDetail.behance && setBehan(userDetail.behance)
            userDetail.protfolio && setPortfolio(userDetail.protfolio)
            userDetail.address && setAddress(userDetail.address)
            userDetail.phoneNumber && setPhone(userDetail.phoneNumber)
        }
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userData').then((value: any) => {
                    setUserData(value)
                    setName(value.name)
                })
            });
        }
    }
    useEffect(() => {
        userDatas()
    }, [])
    return (
        <Modal openModal={props.openProfile} setOpenModal={() => props.setOpenProfile(false)} modalTitle={'Bio'}>
            <form onSubmit={hanleLinkUpdate} className="flex flex-wrap w-full">
                {/* <div className='w-full flex justify-between pb-5'>
                        <p className="font-[600] text-2xl leading-shL  ">Bio</p>
                        <button onClick={() => props.setOpenProfile(false)}>
                            <CloseIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-8 h-8 p-2 "
                            />
                        </button>
                    </div> */}
                <div className="w-full grid grid-cols-12 h-96 overflow-y-auto thinScrollBar pr-4" >
                    <p className='col-span-12 font-[500] mb-5'>Let's get started with some personal details</p>
                    <div className="col-span-12 flex gap-3 pb-3 h-[100%] grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <p className="font-fhW w-full text-smS leading-shL">Full Name</p>
                            <TextInput
                                placeHolder="Phone"
                                value={name}
                                setFunction={setName}
                                class="full"

                            />
                            {nameError && <p className='text-red-500 text-[13px]'>name cannot be empty</p>}
                        </div>
                    </div>
                    <div className="col-span-12 flex gap-3 h-[100%] grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <p className="font-fhW w-full text-smS leading-shL">Phone</p>
                            <PhoneInput
                                defaultCountry="ET" placeholder="Enter phone number"
                                value={phone}
                                onChange={setPhone}
                                className='h-12 px-3 phoneInput bg-white rounded-xl border border-gray-200 focus:border-gradientSecond focus:ring-0 w-full hideIncrease'
                            />
                            {/*   <input
                                    type='text'
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.currentTarget.value)}
                                    className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:border-gradientSecond focus:ring-0 w-full hideIncrease' />
                                 */}
                            {phoneError && <p className='text-red-500 text-[13px]'>{phoneError}</p>}
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
                </div>
                <div className='col-span-12 mt-10 w-full flex md:justify-end'>
                    <div className='w-full md:w-60'>
                        <SubmitButton loading={loading} buttonText="Save" />
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SocialForm