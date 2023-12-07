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
import { getUserDetail } from '@/backend/candidateBackend';
import CoverLetter from '@/components/candidateProfileComponents/CoverLetter';
import WorkHitory from '@/components/candidateProfileComponents/WorkHistory';
import Education from '@/components/candidateProfileComponents/Education';
import { useGlobalContext } from '@/contextApi/userData';
const Profile = () => {
    const { userDetail } = useGlobalContext()
    const [about, setAbout] = useState(true);
    const [allLoading, setAllLoading] = useState(false)
    const userData = async () => {
        setAllLoading(true)
/*         const userInfo = await getUserDetail()
 */        userDetail && setAllLoading(false)
    }
    useEffect(() => {
        userData()
    }, [userDetail])
    return (
        <div >
            <Navigation />
            {allLoading && <CandidateProfileShimmer />}
            {!allLoading && (
                <div className="flex flex-col gap-5 px-3 xl:px-40">
                    <div className="w-full flex flex-wrap gap-10">
                        <div className="w-full flex gap-10 max-md:flex-col mt-10 py-5 bg-red-500 profilePattern max-md:pl-5 md:pl-10">
                            <ProfilePicture />
                            <SocialLinks />
                        </div>
                        <div className="flex w-full gap-5">
                            <p
                                onClick={() => setAbout(true)}
                                className={
                                    about
                                        ? 'border-b-2 border-b-gradientFirst text-2xl font-[600]'
                                        : 'border-b-2 text-gray-500 border-b-textW hover:border-b-gradientFirst text-2xl font-[600] cursor-pointer'
                                }
                            >
                                About
                            </p>
                            <p
                                onClick={() => setAbout(false)}
                                className={
                                    !about
                                        ? 'border-b-2 border-b-gradientFirst text-2xl font-[600]'
                                        : 'border-b-2 text-gray-500 border-b-textW hover:border-b-gradientFirst text-2xl font-[600] cursor-pointer'
                                }
                            >
                                Resume
                            </p>
                        </div>
                    </div>
                    <div className={about ? 'w-full flex gap-4 mt-5 flex-wrap' : 'hidden'}>
                        <CoverLetter />
                        <Certificate />
                        <WorkHitory />
                        <Education />
                        <Project />
                        <Skills />
                    </div>
                    <UploadResume view={about} />
                </div>
            )}
            <Footer />
        </div>
    );
};
export default candidateAuth(Profile);
