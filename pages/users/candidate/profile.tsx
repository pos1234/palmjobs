import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import UploadResume from '@/components/candidateProfileComponents/uploadResume';
import Skills from '@/components/candidateProfileComponents/Skills';
import Certificate from '@/components/candidateProfileComponents/Certificate';
import Project from '@/components/candidateProfileComponents/Project';
import { candidateAuth } from '@/components/withAuth';
import CandidateProfileShimmer from '@/components/shimmer/CandidateProfileShimmer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePicture from '@/components/candidateProfileComponents/ProfilePicture';
import SocialLinks from '@/components/candidateProfileComponents/SocialLinks';
import SocialForm from '@/components/candidateProfileComponents/SocialForm';
import { getUserDetail } from '@/lib/candidateBackend';
const Profile = () => {
    const [about, setAbout] = useState(true);
    const [openSocial, setOpenSocial] = useState(false)
    const [allLoading, setAllLoading] = useState(false)
    const userData = async () => {
        setAllLoading(true)
        const userInfo = await getUserDetail()
        userInfo && setAllLoading(false)
    }
    useEffect(() => {
        userData()
    }, [])
    return (
        <div className="px-3 md:px-16">
            <Navigation />
            {allLoading && <CandidateProfileShimmer />}
            {!allLoading && (
                <div className="grid grid-cols-12 pt-8 xl:pl-48 xl:pr-16 md:mt-20">
                    <div className="col-span-12 grid grid-cols-12">
                        <div className="col-span-12 justify-center flex gap-3 max-md:flex-col justify-items-center">

                            <ProfilePicture />
                            <SocialLinks setOpenProfile={setOpenSocial} />
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
                    <div className={about ? 'col-span-12 grid grid-cols-12 bg-[#F9FBF9] gap-5 px-1 py-2 mt-10 rounded-2xl' : 'hidden'}>
                        <Certificate />
                        <Project />
                        <Skills />
                    </div>
                    <UploadResume view={about} />
                </div>
            )}
            <Footer />
            <SocialForm openProfile={openSocial} setOpenProfile={setOpenSocial} />
        </div>
    );
};
export default candidateAuth(Profile);
