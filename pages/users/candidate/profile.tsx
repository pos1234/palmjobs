import React, { useEffect, useState, lazy } from 'react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Skills from '@/components/candidateProfileComponents/Skills';
import Certificate from '@/components/candidateProfileComponents/Certificate';
import Project from '@/components/candidateProfileComponents/Project';
import { candidateAuth } from '@/components/withAuth';
import CandidateProfileShimmer from '@/components/shimmer/CandidateProfileShimmer';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePicture from '@/components/candidateProfileComponents/ProfilePicture';
import SocialLinks from '@/components/candidateProfileComponents/SocialLinks';
import CoverLetter from '@/components/candidateProfileComponents/CoverLetter';
import WorkHitory from '@/components/candidateProfileComponents/WorkHistory';
import Education from '@/components/candidateProfileComponents/Education';
import { getCandidateDocument } from '@/backend/candidateBackend';
import { getRole } from '@/backend/accountBackend';
import dynamic from 'next/dynamic';
const UploadResume = dynamic(() => import('@/components/candidateProfileComponents/uploadResume'));
const Profile = () => {
/*     const { userDetail } = useGlobalContext()
 */    const [about, setAbout] = useState(true);
    const [allLoading, setAllLoading] = useState(false)
    const [userDetail, setUserDetail] = useState<any>()
    const userData = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                // Your client-side code here using localforage
                localforage.getItem('userDetail').then((value) => {
                    if (value) {
                        const result = JSON.stringify(value)
                        /*                 console.log(result);
                         */
                        setUserDetail(value)
                        setAllLoading(false)
                    }
                    if (!value) {
                        getDetails()
                    }
                });
            });
        }
        setAllLoading(true)
        userDetail && setAllLoading(false)
    }
    const getDetails = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                // Your client-side code here using localforage
                localforage.getItem('userRole').then((value: any) => {
                    if (!value) {
                        useRole()
                    }
                    if (value == 'candidate') {
                        useCandidateDocument()
                    }
                });
            });
        }
    }
    const useRole = async () => {
        const role = await getRole();
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                // Your client-side code here using localforage
                role && localforage.setItem('userRole', role.documents[0].userRole).then(() => {
                });
            });
        }
        if (role && role.documents[0].userRole == 'candidate') {
            useCandidateDocument()
        }
    };
    const useCandidateDocument = async () => {
        const candidate = await getCandidateDocument();
        candidate && setUserDetail(candidate.documents[0]);
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                // Your client-side code here using localforage
                candidate && localforage.setItem('userDetail', candidate.documents[0]).then(() => {
                });
            });
        }
        candidate && setAllLoading(false)
    };
    useEffect(() => {
        userData()
    }, [])
    return (
        <div >
            <Navigation />
            {allLoading && <CandidateProfileShimmer />}
            {!allLoading && (
                <div className="flex flex-col gap-5 px-3 xl:px-40">
                    <div className="w-full flex flex-wrap gap-10">
                        <div className="w-full flex gap-10 max-md:flex-col mt-10 py-5 bg-red-500 profilePattern max-md:pl-5 md:pl-10">
                            <ProfilePicture />
                            <SocialLinks userDetail={userDetail} />
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
                        <CoverLetter userDetail={userDetail} />
                        <Certificate userDetail={userDetail} />
                        <WorkHitory userDetail={userDetail} />
                        <Education userDetail={userDetail} />
                        <Project userDetail={userDetail} />
                        <Skills userDetail={userDetail} />
                    </div>
                    <UploadResume view={about} userDetail={userDetail} />
                </div>
            )}
            <Footer />
        </div>
    );
};
export default candidateAuth(Profile);
