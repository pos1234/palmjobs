import { useState, useEffect } from 'react';
import { getProfileData } from '@/backend/employerBackend';
import 'react-quill/dist/quill.snow.css';
import EmployerProfile from './Profile';
import FirstForm from './jobPostTabs/FirstForm';
import SecondForm from './jobPostTabs/SecondForm';
import ThirdForm from './jobPostTabs/ThirdForm';
import FourthForm from './jobPostTabs/FourthForm';
import PreviewJob from './jobPostTabs/PreviewJob';
import { useJobPostContext } from '@/contextApi/jobPostData';
import ChooseJob from './jobPostTabs/ChooseJob';
const PostAJob = (props: any) => {
    const { jobPostTabs } = useJobPostContext()
    const [compName, setCompName] = useState('');
    const [compDesc, setCompDesc] = useState('');
    const [company, setCompany] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [profileFilled, setProfileFilled] = useState(false);
    const [emailNotify, setEmailNotify] = useState('');
    const [companyData, setCompanyData] = useState<any>()
    const initialData = () => {
        const result = getProfileData();
        result.then((res: any) => {
            res.documents && res.documents[0] && res.documents[0].description && setCompDesc(res.documents[0].description);
            res.documents && res.documents[0] && setCompanyData(res.documents[0]);
        });
    };
    const getProfile = async () => {
        getProfileData().then((res: any) => {
            if (res && res.documents[0]) {
                if (
                    res.documents[0].location == '' ||
                    res.documents[0].phoneNumber == '' ||
                    res.documents[0].description == '' ||
                    res.documents[0].companyName == ''
                ) {
                    setProfileFilled(true);
                    setCompName(res.documents[0].companyName);
                    if (res.documents[0].receiveEmailNotification !== false) {
                        setEmailNotify('true');
                    }
                    if (res.documents[0].receiveEmailNotification == false) {
                        setEmailNotify('false');
                    }
                }
            }
        });
    };
    useEffect(() => {
        getProfile();
    }, [])

    return (
        <>
            <div className="pt-5 px-3 pb-10 bg-textW min-h-screen md:pl-10 xl:pr-28 xl:px-20">
                {jobPostTabs.chooseJob == false && (jobPostTabs.first || jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth) && <p className="text-neutral-900 text-opacity-70 text-base font-normal leading-10">Job Post Progress</p>}
                {jobPostTabs.chooseJob == false && (jobPostTabs.first || jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth) && (
                    <div
                        className="col-span-12 grid grid-cols-12 gap-x-2 mt-1 md:pr-20 lg:pr-40
             xl:pr-60"
                    >
                        <div className="rounded-2xl bg-gradientFirst h-1.5 col-span-3"></div>
                        <div
                            className={
                                jobPostTabs.second || jobPostTabs.third || jobPostTabs.fourth
                                    ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                                    : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                            }
                        ></div>
                        <div
                            className={
                                jobPostTabs.third || jobPostTabs.fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                            }
                        ></div>
                        <div
                            className={jobPostTabs.fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'}
                        ></div>
                    </div>
                )}
                <div className={jobPostTabs.chooseJob ? '' : 'hidden'}>
                    <ChooseJob />
                </div>
                <div className={jobPostTabs.first == true ? '' : 'hidden'}>
                    <FirstForm />
                </div>
                <div className={jobPostTabs.second == true ? '' : 'hidden'} >
                    <SecondForm />
                </div>
                <div className={jobPostTabs.third == true ? '' : 'hidden'}>
                    <ThirdForm />
                </div>
                <div className={jobPostTabs.fourth == true ? '' : 'hidden'}>
                    <FourthForm setOpenPreview={setOpenPreview} />
                </div>

                {/*                 {!profileFilled && }
 */}                {profileFilled && <EmployerProfile setFilled={setProfileFilled} />}
                <PreviewJob openModal={openPreview} setOpenModal={setOpenPreview} companyData={companyData}
                />
            </div>
        </>
    );
}
export default PostAJob;
