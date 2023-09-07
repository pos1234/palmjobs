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
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useUser } from '@/lib/context';
import { MiddleWare } from '@/lib/middleware';
import { accountData } from '@/lib/services';
import { useRouter } from 'next/router';
import UploadResume from '@/components/candidateProfileComponents/uploadResume';
import Skills from '@/components/candidateProfileComponents/Skills';
import Bio from '@/components/candidateProfileComponents/Bio';
import Certificate from '@/components/candidateProfileComponents/Certificate';
import Project from '@/components/candidateProfileComponents/Project';
interface Data {
    word: string;
}
const Nav = () => {
    const loadingIn = '/images/loading.svg';
    const [openProfile, setOpenProfile] = useState(false);
    const [about, setAbout] = useState(true);
    const router = useRouter();
    const [profileError, setProfileError] = useState('');
    const userData: any = accountData();
    const {
        firstLetter,
        file,
        image,
        deleteProfilePicture,
        setEditName,
        linked,
        setLinked,
        githubLink,
        setGithubLink,
        addResume,
        updateResume,
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
        setLocate
    } = MiddleWare();

    const { loading, user, role } = useUser();

    useEffect(() => {
        const cand = !(role == '' || role == 'candidate') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
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
    return (
        <div className="px-3 md:px-16">
            <Navigation />
            <div className="grid grid-cols-12 pt-8 xl:pl-48 xl:pr-16 mt-20">
                <div className="col-span-12 grid grid-cols-12">
                    <div className="col-span-12 grid grid-cols-12 justify-items-center md:col-span-7 md:justify-items-start lg:col-span-6 xl:col-span-6 ">
                        <div className="col-span-12 relative md:col-span-4 xl:col-span-4">
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
                                        <p className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW flex text-center justify-center text-[5rem] font-frhW">
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
                        <div className="col-span-12 pt-5 md:col-span-8 md:pl-5 xl:pl-2 xl:col-span-6">
                            <p className="font-frhW text-frhS leading-frhL">
                                {userData && userData.name}
                                <EditIcon
                                    onClick={() => setOpenProfile(!openProfile)}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-5 h-5 p-1 ml-2 cursor-pointer"
                                />
                            </p>
                            <p className="font-midRW text-midRS leading-midRL text-lightGrey mt-5">
                                <FmdGoodOutlinedIcon className="w-7 h-7" /> Addis Ababa
                                {linked && (
                                    <Link target="_blank" href={linked}>
                                        <LinkedInIcon sx={{ color: '#FE5E0A' }} className="w-7 h-7" />
                                    </Link>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 flex space-x-10 pl-3 pt-7">
                        <p
                            onClick={() => setAbout(true)}
                            className={
                                about
                                    ? 'font-shW text-shS leading-shL cursor-pointer'
                                    : 'font-shW text-shS leading-shL text-lightGrey cursor-pointer'
                            }
                        >
                            About
                        </p>
                        <p
                            onClick={() => setAbout(false)}
                            className={
                                about
                                    ? 'font-shW text-shS leading-shL text-lightGrey cursor-pointer'
                                    : 'font-shW text-shS leading-shL cursor-pointer'
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
            <Footer />
            {/* MODALS */}
            {openProfile && (
                <ConfirmModal isOpen={openProfile} handleClose={() => setOpenProfile(!openProfile)}>
                    <div className="mx-2 h-4/5 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pt-8 md:h-2/3 md:pl-14 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 order-1 grid grid-cols-12">
                            <div className="col-span-11">
                                <p className="font-thW text-frhS leading-shL pb-5 ">Social Links</p>
                                <form className="col-span-12 grid grid-cols-12" onSubmit={addSocialLink}>
                                    <div className="col-span-12 grid grid-cols-12 gap-2 h-[20rem] overflow-auto md:h-[18rem] lg:h-[18rem]">
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Phone
                                                <span className="float-right pr-5 text-fadedText text-numS">{call.length} / 10</span>
                                            </p>
                                            <input
                                                value={call}
                                                type="number"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 10) {
                                                        setCall(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Enter Phone"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS hideIncrease"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Address
                                                <span className="float-right pr-5 text-fadedText text-numS">{behan.length} / 200</span>
                                            </p>
                                            <input
                                                value={locate}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 50) {
                                                        setLocate(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Enter Address"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                LinkedIn
                                                <span className="float-right pr-5 text-fadedText text-numS">{linked.length} / 200</span>
                                            </p>
                                            <input
                                                value={linked}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setLinked(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="LinkedIn Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Github
                                                <span className="float-right pr-5 text-fadedText text-numS">{githubLink.length} / 200</span>
                                            </p>
                                            <input
                                                value={githubLink}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setGithubLink(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Github Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Behance
                                                <span className="float-right pr-5 text-fadedText text-numS">{behan.length} / 200</span>
                                            </p>
                                            <input
                                                value={behan}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setBehan(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Behance Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Portfolio
                                                <span className="float-right pr-5 text-fadedText text-numS">{githubLink.length} / 200</span>
                                            </p>
                                            <input
                                                value={portfolio}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setPortfolio(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Portfolio Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5">
                                        {loadings == true ? (
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
export default Nav;
