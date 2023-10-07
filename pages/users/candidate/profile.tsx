import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EditIcon from '@mui/icons-material/Edit';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ConfirmModal from '@/components/ConfirmModal';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { MiddleWare } from '@/lib/middleware';
import { accountData, addSocials, signOut } from '@/lib/services';
import { useRouter } from 'next/router';
import UploadResume from '@/components/candidateProfileComponents/uploadResume';
import Skills from '@/components/candidateProfileComponents/Skills';
import Bio from '@/components/candidateProfileComponents/Bio';
import Certificate from '@/components/candidateProfileComponents/Certificate';
import Project from '@/components/candidateProfileComponents/Project';
import { candidateAuth } from '@/components/withAuth';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import CandidateProfileShimmer from '@/components/shimmer/CandidateProfileShimmer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '@/components/TextInput';
interface Data {
    word: string;
}
const Profile = () => {
    const loadingIn = '/images/loading.svg';
    const [openProfile, setOpenProfile] = useState(false);
    const [about, setAbout] = useState(true);
    const router = useRouter();
    const [profileError, setProfileError] = useState('');
    const [loadin, setLoadin] = useState(false);
    const [githubError, setGithubError] = useState('');
    const [behanceError, setBehanceError] = useState('');
    const [linkedError, setLinkedError] = useState('');
    const [portfolioError, setPortfolioError] = useState('');
    const userData: any = accountData();
    const {
        allLoading,
        firstLetter,
        file,
        image,
        deleteProfilePicture,
        setEditName,
        linked,
        setLinked,
        githubLink,
        setGithubLink,
        call,
        setCall,
        behan,
        setBehan,
        portfolio,
        setPortfolio,
        addSupportDocument,
        updateSupportDoc,
        updateProfilePictures,
        uploadProfilePictures,
        handleCoverLetter,
        addSocialLink,
        loadings,
        locate,
        setLocate,
        addPhoneAddress,
        coverLetter,
        setCoverLetter,
        documentId
    } = MiddleWare();
    const editUserName = () => {
        setEditName(true);
    };
    const imageUploadChecker = (functionName: any, uploadedFile: any) => {
        if (uploadedFile) {
            const fileList = Array.from(uploadedFile);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles = fileList.filter((file: any) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                return functionName(uploadedFile && uploadedFile[0]);
            });
        }
    };
    const documentUploadChecker = (functionName: any, uploadedFile: any) => {
        if (uploadedFile) {
            const fileList = Array.from(uploadedFile);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf', 'docx'];
            const filteredFiles: any = fileList.filter((file: any) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return functionName(uploadedFile && uploadedFile[0]);
            });
        }
    };
    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        imageUploadChecker(updateProfilePictures, e.currentTarget.files);
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        imageUploadChecker(uploadProfilePictures, e.currentTarget.files);
    };
    const uploadSupportDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return addSupportDocument(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const updateSupportDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return updateSupportDoc(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const addCoverLetter = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        handleCoverLetter();
    };
    const handlePhoneLocation = () => {
        addPhoneAddress();
    };
    const removeHtmlTags = (html: string) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, '');
    };
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
            setLoadin(true);
            addSocials(linked, githubLink, behan, portfolio, documentId)
                .then((res) => {
                    setLoadin(false);
                    toast.success('Saved Successfully');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Not Saved Successfully');
                    setLoadin(false);
                });
        }
    };
    return (
        <div className="px-3 md:px-16">
            <ToastContainer />
            <Navigation />
            {allLoading && <CandidateProfileShimmer />}
            {!allLoading && (
                <div className="grid grid-cols-12 pt-8 xl:pl-48 xl:pr-16 md:mt-20">
                    <div className="col-span-12 grid grid-cols-12">
                        <div className="col-span-12 justify-center flex gap-3 max-md:flex-col justify-items-center">
                            <div className="col-span-12 relative md:col-span-4 xl:col-span-4 flex justify-center">
                                <div className="profilePictureContainer w-40 h-40 col-span-2 rounded-3xl cursor-pointer">
                                    {image ? (
                                        <>
                                            <img src={image} className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer" />
                                            <DeleteIcon
                                                onClick={deleteProfilePicture}
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-7 h-7 p-1.5 mr-0 absolute right-0 top-0 -mr-[0.7rem] mt-3 cursor-pointer"
                                            />
                                            <div className="uploadProfile">
                                                <label htmlFor="photo-upload" className="custom-file-upload">
                                                    <div className="img-wrap img-upload">
                                                        <CameraAltOutlinedIcon className="text-black" />
                                                    </div>
                                                    <input id="photo-upload" type="file" value={file} onChange={updatePic} />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="w-40 h-40 col-span-2 rounded-3xl pt-5 cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW flex text-center justify-center text-[5rem] font-frhW">
                                                {firstLetter}
                                            </p>
                                            <div className="uploadProfile">
                                                <label htmlFor="photo-upload" className="custom-file-upload">
                                                    <div className="img-wrap img-upload">
                                                        <CameraAltOutlinedIcon className="text-textW" />
                                                    </div>
                                                    <input id="photo-upload" type="file" onChange={uploadPic} />
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {profileError && <p className="text-gradientFirst pt-3 pl-2 text-[12px]">{profileError}</p>}
                            </div>
                            <div className="col-span-12 max-md:mt-3 md:col-span-8 sm:max-md:px-40 lg:pl-5 xl:pl-3">
                                <p className="font-frhW text-bigS ">{userData && userData.name}</p>
                                <div className="font-midRW text-midRS leading-midRL text-lightGrey flex flex-col gap-y-4 mt-2">
                                    <div className="flex items-center">
                                        <span className="w-5 h-5 text-stone-400 z-[2] pl-3">
                                            <FmdGoodOutlinedIcon className="-mt-[4px]" />
                                        </span>
                                        <input
                                            placeholder="Enter Address"
                                            type="text"
                                            className="-ml-5 z-[1] rounded-full w-full pl-10 py-3 group border-stone-200 focus:ring-orange-300 focus:outline-0 focus:border-0 "
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
                                            className="-ml-5 z-[1] rounded-full w-full pl-10 py-3 group border-stone-200 focus:ring-orange-300 focus:outline-0 focus:border-0 "
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
                                                <LinkedInIcon className="w-7 h-7 hover:text-[#FE5E0A]" />
                                            </Link>
                                        )}
                                        {githubLink && (
                                            <Link target="_blank" title="github" href={githubLink}>
                                                <GitHubIcon className="w-7 h-7 hover:text-[#FE5E0A]" />
                                            </Link>
                                        )}
                                        {behan && (
                                            <Link target="_blank" title="behance" href={behan}>
                                                <FormatBoldIcon className="w-8 h-8 hover:text-[#FE5E0A]" />
                                            </Link>
                                        )}
                                        {portfolio && (
                                            <Link target="_blank" title="portifolio" href={portfolio}>
                                                <PhonelinkIcon className="w-7 h-7 hover:text-[#FE5E0A]" />
                                            </Link>
                                        )}
                                        <EditIcon
                                            onClick={() => setOpenProfile(!openProfile)}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-5 h-5 p-1 ml-2 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl p-2 pb-5 pr-0 flex-grow max-sm:h-60">
                                <p className="font-shW text-midS leading-shL">Cover Letter</p>
                                <textarea
                                    style={{ resize: 'none' }}
                                    className="border-0 focus:border-0 focus:ring-0 h-full max-h-[80%] w-full overflow-y-auto overflow-x-hidden"
                                    value={coverLetter ? removeHtmlTags(coverLetter) : ''}
                                    onChange={(e) => setCoverLetter(e.currentTarget.value)}
                                    onBlur={handleCoverLetter}
                                />
                            </div>
                        </div>
                        <div className="col-span-12 flex space-x-10 pl-3 pt-7">
                            <p
                                onClick={() => setAbout(true)}
                                className={
                                    about
                                        ? 'font-shW text-shS leading-shL cursor-pointer px-5 flex items-center h-[3.5rem] rounded-2xl bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW'
                                        : 'font-shW text-shS leading-shL cursor-pointer px-5 flex items-center h-[3.5rem] rounded-2xl hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW'
                                }
                            >
                                About
                            </p>
                            <p
                                onClick={() => setAbout(false)}
                                className={
                                    !about
                                        ? 'font-shW text-shS leading-shL cursor-pointer px-5 flex items-center h-[3.5rem] rounded-2xl bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW'
                                        : 'font-shW text-shS leading-shL cursor-pointer px-5 flex items-center h-[3.5rem] rounded-2xl hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW'
                                }
                            >
                                Resume
                            </p>
                        </div>
                    </div>
                    <div className={about ? 'col-span-12 grid grid-cols-12 bg-forBack gap-5 px-1 pt-2 mt-10 rounded-2xl' : 'hidden'}>
                        <Bio />
                        <Certificate />
                        <Project />
                        <Skills />
                    </div>
                    <UploadResume view={about} />
                </div>
            )}
            <Footer />
            {openProfile && (
                <ConfirmModal isOpen={openProfile} handleClose={() => setOpenProfile(!openProfile)}>
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
                                                setFunction={setPortfolioError}
                                                errorMessage={portfolioError}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5">
                                        {loadin == true ? (
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
                                    </div>
                                </form>
                            </div>
                            <div className="col-span-1 order-2 md:order-3 md:col-span-1">
                                <button onClick={() => setOpenProfile(!openProfile)}>
                                    <CloseIcon
                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-8 h-8 p-2 "
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default candidateAuth(Profile);
