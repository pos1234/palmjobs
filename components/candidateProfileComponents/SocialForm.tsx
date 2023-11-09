import React, { useEffect, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import TextInput, { SubmitButton } from '../TextInput'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { addSocials, getCandidateDocument, getUserDetail } from '@/lib/candidateBackend';
const SocialForm = (props: any) => {
    const loadingIn = '/images/loading.svg';
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
            addSocials(linked, githubLink, behan, portfolio)
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
        userInfo.linkedIn && setLinked(userInfo.linkedIn)
        userInfo.github && setGithubLink(userInfo.github)
        userInfo.behance && setBehan(userInfo.behance)
        userInfo.protfolio && setPortfolio(userInfo.protfolio)
    }
    useEffect(() => {
        userData()
    }, [])

    return (
        <ConfirmModal isOpen={props.openProfile} handleClose={() => props.setOpenProfile(false)}>
            <div className="mx-2 h-[80%] w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 pb-14 md:pt-8 md:h-auto md:pl-14 md:w-2/3 lg:w-1/2 md:mx-0">
                <div className="col-span-12 order-1 grid grid-cols-12 max-sm:pr-4">
                    <div className="col-span-11">
                        <p className="font-thW text-frhS leading-shL pb-5 ">Social Links</p>
                        <form className="col-span-12 grid grid-cols-12" onSubmit={hanleLinkUpdate}>
                            <div className="col-span-12 flex gap-3 h-[100%] grid grid-cols-1 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <p className="font-fhW w-full text-smS leading-shL">LinkedIn</p>
                                    <TextInput
                                        errorMessage={linkedError}
                                        placeHolder="Behance Link"
                                        value={linked}
                                        setFunction={setLinked}
                                        class="full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="w-full font-fhW text-smS leading-shL">Github</p>
                                    <TextInput
                                        class="full"
                                        placeHolder="Behance Link"
                                        value={githubLink}
                                        setFunction={setGithubLink}
                                        errorMessage={githubError}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="w-full font-fhW text-smS leading-shL">Behance</p>
                                    <TextInput
                                        placeHolder="Behance Link"
                                        value={behan}
                                        errorMessage={behanceError}
                                        setFunction={setBehan}
                                        class="full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="w-full font-fhW text-smS leading-shL">Portfolio</p>
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
                            {/*  <div className="col-span-12 grid justify-items-end pr-3 mt-5">
                                {loading == true ? (
                                    <img
                                        src={loadingIn}
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    />
                                ) : (
                                    <button
                                        type="submit"
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    >
                                        Save
                                    </button>
                                )}
                            </div> */}
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