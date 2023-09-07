import { useState, Fragment } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import RadioInput from '@/components/RadioInput';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Skills from '@/components/employerComponents/Skills';
import CloseIcon from '@mui/icons-material/Close';
import DropDown from '@/components/DropDown';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import ConfirmModal from '@/components/ConfirmModal';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const salaryRangeData = [{ name: 'Range' }, { name: 'Starting amount' }, { name: 'Maximum amount' }, { name: 'Exact amount' }];
const expData = [
    'No experience needed',
    'Under 1 year',
    '1 year',
    '2 year',
    '3 year',
    '4 year',
    '5 year',
    '6 year',
    '7 year',
    '8 year',
    '9 year',
    '10+ years'
];
const salaryPerData = [{ name: 'Per Month' }, { name: 'Per Hour' }, { name: 'Per Year' }];

const TextInput = (props: any) => {
    return (
        <input
            placeholder={props.placeHolder}
            value={props.value}
            onChange={(e) => props.setFunction(e.currentTarget.value)}
            className="w-96 h-12 pl-5 bg-white rounded-3xl border border-gray-200"
        />
    );
};
const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium leading-loose'}>*</span>
        </div>
    );
};

const RequredExp = (props: any) => {
    return (
        <div
            onClick={() => props.setFuntioner(props.text)}
            className={
                props.value == props.text
                    ? 'h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center rounded-3xl bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW'
                    : 'hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center bg-white rounded-3xl border border-gray-200'
            }
        >
            <AddIcon sx={{ fontSize: '1.3rem' }} />
            <p className="text-[0.9rem]"> {props.text}</p>
        </div>
    );
};
const Jobtype = (props: any) => {
    return (
        <div className="col-span-6 flex flex-col max-md:pl-2 py-2 rounded-2xl gap-y-2 bg-textW sm:col-span-3 items-center">
            <p className="font-fhW sm:max-md:text-[0.8rem] md:text-fhS md:max-lg:text-[1rem]"> {props.salary}</p>
            <p className=" text-fadedText sm:max-md:text-[12px] flex md:max-lg:text-[0.7rem] lg:text-[14px]">
                <PinDropOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />{' '}
                {props.money}
            </p>
        </div>
    );
};

const PostAJob = () => {
    const profile = '/images/profile.svg';
    const previewImage = '/images/previewImage.svg';
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [datas, setDatas] = useState('');
    const [location, setLocation] = useState('');
    const [remote, setRemote] = useState(true);
    const [jobtype, setJobTye] = useState('');
    const [addLocation, setAddLocation] = useState(false);
    const [expRequired, setExpRequired] = useState('');
    const [openPositions, setOpenPositions] = useState<number>(1);
    const [salaryRange, setSalaryRange] = useState(salaryRangeData[0]);
    const [salaryPer, setSalaryPer] = useState(salaryPerData[0]);
    const [jobDesc, setJobDesc] = useState('');
    const [palm, setPalm] = useState(true);
    const [email, setEmail] = useState(false);
    const [link, setLink] = useState(false);
    const [company, setCompany] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 1) {
            setOpenPositions(value);
        }
    };
    const handleBack = () => {
        if (fourth == true) {
            setFourth(false);
            setThird(true);
            setSecond(false);
        } else if (third == true) {
            setFourth(false);
            setThird(false);
            setSecond(true);
        } else if (second == true) {
            setFourth(false);
            setThird(false);
            setSecond(false);
        }
    };
    const handleFront = () => {
        console.log('hey');

        if (second == false && third == false && fourth == false) {
            setFourth(false);
            setThird(false);
            setSecond(true);
        }
        if (second == true && third == false && fourth == false) {
            setFourth(false);
            setThird(true);
            setSecond(false);
        }
        if (second == false && third == true && fourth == false) {
            setFourth(true);
            setThird(false);
            setSecond(false);
        }
    };
    return (
        <div className="pt-5 pl-10 pb-10 bg-textW min-h-screen xl:pr-28 xl:px-20">
            <p className="text-neutral-900 text-opacity-70 text-base font-normal leading-10">Job Post Progress</p>
            <div
                className="col-span-12 grid grid-cols-12 gap-x-2 pr-20 mt-1 lg:pr-40
             xl:pr-60"
            >
                <div className="rounded-2xl bg-gradientFirst h-1.5 col-span-3"></div>
                <div
                    className={
                        second || third || fourth
                            ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                            : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                    }
                ></div>
                <div
                    className={
                        third || fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                    }
                ></div>
                <div
                    className={fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'}
                ></div>
            </div>
            <div className={!second && !third && !fourth ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}>
                <div className="text-neutral-900 text-3xl font-semibold leading-10">Provide Basic Information</div>
                <RequiredTextLabel text="Job Title" />
                <TextInput placeHolder="Job Position" value={datas} setFunction={setDatas} />
                <RequiredTextLabel text="Job Category" />
                <TextInput placeHolder="Job Category" value={datas} setFunction={setDatas} />
                <RequiredTextLabel text="How many open roles ?" />
                <div className="flex gap-x-5 items-center mt-3">
                    <div
                        onClick={() => {
                            if (openPositions > 1) setOpenPositions(openPositions - 1);
                        }}
                        className="text-orange-600 cursor-pointer"
                    >
                        <RemoveIcon sx={{ fontSize: '2rem' }} />
                    </div>
                    <input
                        type="number"
                        value={openPositions}
                        onChange={handleInputChange}
                        className="border-2 w-16 pl-5 py-2 rounded-3xl hideIncrease"
                    />
                    <div
                        onClick={() => setOpenPositions(openPositions + 1)}
                        className="text-orange-600 rounded-full p-0.5 flex items-center justify-center cursor-pointer border-2 border-orange-600"
                    >
                        <AddIcon />
                    </div>
                </div>
                <RequiredTextLabel text="Which option best describe this job's location ?" />
                <div className="flex bg-forBack w-72 p-2 gap-x-5">
                    <div
                        onClick={() => {
                            setAddLocation(!addLocation);
                            setRemote(!remote);
                        }}
                        className={
                            remote
                                ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <SettingsRemoteIcon className="-ml-2" />
                        <p className="absolute bottom-0">Remote</p>
                    </div>
                    <div
                        onClick={() => {
                            setAddLocation(!addLocation);
                            setRemote(!remote);
                        }}
                        className={
                            addLocation
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <EditLocationAltOutlinedIcon className="-ml-2" />
                        <p className="absolute bottom-0">Add Location</p>
                    </div>
                </div>
                {addLocation && (
                    <>
                        <RequiredTextLabel text="Address" />
                        <TextInput placeHolder="Job Address" value={datas} setFunction={setDatas} />
                    </>
                )}
                {/* <div className="flex justify-end pt-5">
                    <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                        Save and Continue
                    </div>
                </div> */}
            </div>
            <div className={second && !third && !fourth ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}>
                <div className="text-neutral-900 text-3xl font-semibold leading-10">Technology Details</div>
                <RequiredTextLabel text="What is the job type" />
                <div className="flex gap-x-4 flex-wrap gap-y-3">
                    <RadioInput radioName="jobType" radioText="Internship" radioValue="Internship" setFunction={setJobTye} />
                    <RadioInput radioName="jobType" radioText="Full Time" radioValue="Full Time" setFunction={setJobTye} />
                    <RadioInput radioName="jobType" radioText="Part Time" radioValue="Part Time" setFunction={setJobTye} />
                    <RadioInput radioName="jobType" radioText="Remote" radioValue="Remote" setFunction={setJobTye} />
                </div>
                <RequiredTextLabel text="What experience level is required ?" />
                <TextInput placeHolder="Job Category" value={datas} setFunction={setDatas} />
                <RequiredTextLabel text="How many open roles ?" />
                <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3 xl:pr-60">
                    {expData.map((item: any, index: number) => {
                        return <RequredExp text={item} value={expRequired} setFuntioner={setExpRequired} />;
                    })}
                </div>
                <RequiredTextLabel text="Required Skills ?" />
                <Skills />
                {/* <div className="flex justify-between pt-5">
                    <div className="text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                        <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                    </div>
                    <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                        Save and Continue
                    </div>
                </div> */}
            </div>
            <div className={!second && third && !fourth ? 'col-span-12 pt-5  space-y-3 ' : 'hidden'}>
                <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">
                    Add Compensation and Description
                </div>
                <RequiredTextLabel text="What is the pay ?" req="nReq" />
                <div className="flex flex-wrap gap-5 xl:pr-10">
                    <div className="w-40">
                        <DropDown selectedElement={salaryRange} setSelectedElement={setSalaryRange} displayedData={salaryRangeData} />
                    </div>
                    {(salaryRange.name == 'Range' || salaryRange.name == 'Starting amount') && (
                        <input type="number" placeholder="Minimum" className="pl-5 w-40 rounded-full hideIncrease" />
                    )}
                    {(salaryRange.name == 'Range' || salaryRange.name == 'Maximum amount') && (
                        <input type="number" placeholder="Maximum" className="pl-5 w-40 rounded-full hideIncrease" />
                    )}
                    {salaryRange.name == 'Exact amount' && (
                        <input type="number" placeholder="Exact amount" className="pl-5 w-40 rounded-full hideIncrease" />
                    )}
                    <div className="w-48">
                        <DropDown selectedElement={salaryPer} setSelectedElement={setSalaryPer} displayedData={salaryPerData} />
                    </div>
                </div>
                <RequiredTextLabel text="Job Description ?" />
                <div className="pb-20 mr-2 xl:mr-64">
                    <ReactQuill className="h-28 text-addS" value={jobDesc} onChange={(e) => setJobDesc(e)} placeholder="Add Description" />
                </div>
                {/* <div className="flex justify-between pt-5 self-end">
                    <div className="text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                        <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                    </div>
                    <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                        Save and Continue
                    </div>
                </div> */}
            </div>
            <div className={!second && !third && fourth ? 'col-span-12 pt-5  space-y-3 ' : 'hidden'}>
                <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">Set application Preference</div>
                <div className="flex bg-forBack w-1/2 p-2 gap-x-5">
                    <div
                        onClick={() => {
                            setPalm(true);
                            setEmail(false);
                            setLink(false);
                        }}
                        className={
                            palm
                                ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20 text-stone-400'
                        }
                    >
                        <ArticleIcon className="-ml-0.5" />
                        <p className="absolute bottom-1">Palmjobs</p>
                    </div>
                    <div
                        onClick={() => {
                            setPalm(false);
                            setEmail(true);
                            setLink(false);
                        }}
                        className={
                            email
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 text-stone-400 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <AlternateEmailIcon className="-ml-2" />
                        <p className="absolute bottom-1">Email</p>
                    </div>
                    <div
                        onClick={() => {
                            setPalm(false);
                            setEmail(false);
                            setLink(true);
                        }}
                        className={
                            link
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor text-stone-400 hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <InsertLinkIcon className="-ml-2" />
                        <p className="absolute bottom-1">External</p>
                    </div>
                </div>
                {email && (
                    <>
                        <RequiredTextLabel text="Email" />
                        <TextInput placeHolder="Email Address" value={datas} setFunction={setDatas} />
                    </>
                )}
                {link && (
                    <>
                        <RequiredTextLabel text="External Link" />
                        <TextInput placeHolder="External Link" value={datas} setFunction={setDatas} />
                    </>
                )}
                <RequiredTextLabel text="Job Deadline" req="nReq" />
                <input type="date" className="rounded-full px-28 py-3 cursor-pointer" />
            </div>
            <div className="flex justify-between pt-5 self-end">
                <div
                    onClick={handleBack}
                    className="text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12"
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div
                    onClick={() => setOpenPreview(true)}
                    className={
                        fourth
                            ? 'text-orange-600 flex items-center justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12 ml-40'
                            : 'hidden'
                    }
                >
                    See Preview &nbsp; <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                </div>
                <div
                    onClick={handleFront}
                    className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12"
                >
                    Save and Continue
                </div>
            </div>
            {
                <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
                    <div className="mx-2 pb-5 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-6 md:pl-8 md:w-2/3 lg:w-1/2">
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-10  flex items-center">
                                <img src={previewImage} className="w-16 lg:w-20" />
                                <div className="col-span-9 flex flex-col pl-5">
                                    <div className="text-neutral-900 text-[0.9rem] font-semibold leading-10 lg:text-lg">
                                        This is a preview of what people may see
                                    </div>
                                    <div className="text-neutral-400 text-sm font-light leading-normal">
                                        Your job post may look slightly different when it is live
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end">
                                <button onClick={() => setOpenPreview(!openPreview)}>
                                    <CloseIcon
                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-8 h-8 p-2 "
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl relative px-2 lg:px-16">
                            <div className="col-span-12 grid grid-cols-12 gap-0f">
                                <img src={profile} className="col-span-2 w-full h-full sm:h-[5.8rem]" />
                                <div className="col-span-8 flex flex-col pl-3">
                                    <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">Nylos</p>
                                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                        Marketing Manager
                                    </p>
                                    <p className="text-fadedText">
                                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> Addis Abeba
                                    </p>
                                </div>
                                <div className="col-span-2 flex gap-x-5 text-lightGrey items-center">
                                    <ShareOutlinedIcon className="text-[2rem] cursor-pointer" />
                                    <BookmarkBorderOutlinedIcon className="text-[2rem] cursor-pointer" />
                                </div>
                            </div>
                            <div className="col-span-12 grid grid-cols-12 bg-forBack gap-x-1 gap-y-2 md:gap-x-2 md:p-2 xl:mx-2">
                                <Jobtype salary="Salary" money="5000" />
                                <Jobtype salary="Job Type" money="Remote" />
                                <Jobtype salary="Applicants" money="20 / 50" />
                                <Jobtype salary="Skill" money="Expert" />
                            </div>
                            <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-full">
                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                            : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                    }
                                    onClick={() => setCompany(false)}
                                >
                                    Description
                                </div>

                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                            : 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                    }
                                    onClick={() => setCompany(true)}
                                >
                                    Company
                                </div>
                            </div>
                            {!company && (
                                <div className="col-span-12 mx-3">
                                    <p className="font-thW text-frhS">Job Description</p>
                                    <p className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar">
                                        Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet senectus mi viverra. Lectus
                                        fringilla ut dignissim mauris diam vitae pharetra. Sagittis phasellus morbi morbi dis. Nisi sit arcu
                                        scelerisque donec accumsan faucibus duis. Placerat egestas fermentum pretium phasellus id urna eget
                                        elementum duis. Netus tellus senectus sollicitudin egestas adipiscing nulla aenean vestibulum.
                                        Sapien velit lorem facilisis eget vitae. Sit id viverra enim ut hendrerit ultricies sed praesent.
                                    </p>
                                    <div className="w-full mt-1 rounded-full rounded-3xl bg-gradientSecond text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer ">
                                        Apply
                                    </div>
                                </div>
                            )}
                            {company && (
                                <div className="col-span-12 mx-3">
                                    <p className="font-thW text-frhS">Company's Detail</p>
                                    <p className="text-midRS text-fadedText max-h-20 overflow-y-auto hideScrollBar">
                                        Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet senectus mi viverra. Lectus
                                        fringilla ut dignissim mauris diam vitae pharetra. Sagittis phasellus morbi morbi dis. Nisi sit arcu
                                        scelerisque donec accumsan faucibus duis. Placerat egestas fermentum pretium phasellus id urna eget
                                        elementum duis. Netus tellus senectus sollicitudin egestas adipiscing nulla aenean vestibulum.
                                        Sapien velit lorem facilisis eget vitae. Sit id viverra enim ut hendrerit ultricies sed praesent. Et
                                        viverra ipsum auctor at eleifend. Integer integer rhoncus amet sagittis erat in facilisi diam est.
                                        Iaculis ut interdum mattis aliquet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ConfirmModal>
            }
        </div>
    );
};
export default PostAJob;
