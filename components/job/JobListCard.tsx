import React, { useState } from 'react'
import JobImage from '../JobImage';
import { getCompanyData } from '@/lib/employerBackend';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShareIcon from '@mui/icons-material/Share';
import Share from '../Share';
const SmallLists = (props: any) => {
    return <li className="inline bg-[#FAFAFA] text-xs text-gradientFirst rounded-md p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:py-2">
        {props.icon}
        <span className='text-[#20262E]'>{props.items}</span>
    </li>
}
const ReturnName = (props: any) => {
    const [companyName, setCompanyName] = useState('');
    const documents = getCompanyData(props.id);
    documents.then(async (res) => {
        if (res.documents && res.documents[0] && res.documents[0].description) {
            setCompanyName(res.documents[0].companyName);
        } else {
            setCompanyName('');
        }
    });
    return <div className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">{companyName}</div> || null;
};
const JobListCard = (props: any) => {
    const [openShare, setOpenShare] = useState(false)
    return (
        <div
            onClick={() => {
                props.setEmployerId(props.items.employerId);
                props.setJobDetailId(props.items.$id);
                props.setOpenJobDetail(true);
            }}
            key={props.index}
            className={
                props.items.$id == props.jobDetailId
                    ? 'cursor-pointer max-h-[18rem] bg-textW grid grid-cols-12 py-3 px-4 rounded-3xl border-2 border-gradientFirst rounded-xl xl:px-7 xl:py-7 '
                    : 'cursor-pointer max-h-[18rem] bg-textW grid grid-cols-12 py-3 px-4 rounded-3xl border-2 hover:border-gradientFirst rounded-xl xl:px-7 xl:py-7 '
            }
        >
            <div className='col-span-12 flex justify-between flex-wrap gap-2'>
                <div className='flex items-center gap-3'>
                    <JobImage id={props.items.employerId} className=" rounded-full h-12 w-12" />
                    <ReturnName id={props.items.employerId} />
                </div>
                <div className='flex items-center hover:text-gradientFirst'>
                    <ShareIcon onClick={() => setOpenShare(true)} sx={{fontSize:'1.5rem'}}/>
                </div>
                <div className="w-full flex flex-col justify-center">
                    {props.items.jobTitle && (
                        <p className="font-bold text-[1rem] sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.5rem]">
                            {props.items.jobTitle}
                        </p>
                    )}
                    {props.items.jobLocation && (
                        <p className="text-fadedText max-sm:text-[14px] flex items-center gap-2">
                            <PinDropOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                            {props.items.jobLocation}
                        </p>
                    )}
                </div>
            </div>

            <div className="col-span-12 mt-4">
                <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1 justify-between flex-wrap">
                    {props.items.jobType &&
                        <SmallLists icon={<BusinessCenterIcon
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1 " />}
                            items={props.items.jobType} />
                    }
                    {(props.items.minSalary || props.items.maxSalary) && (
                        <SmallLists icon={props.items.currency == 'euro' ? (
                            <EuroIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : props.items.currency == 'usd' ? (
                            <AttachMoneyOutlined
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : props.items.currency == 'gpb' ? (
                            <CurrencyPoundIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : props.items.currency == 'rnp' ? (
                            <CurrencyRupeeIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : (
                            <span className="text-[7px] mr-1">ETB</span>
                        )}
                            items={!props.items.minSalary && props.items.maxSalary
                                ? props.items.maxSalary
                                : props.items.minSalary && !props.items.maxSalary
                                    ? props.items.minSalary
                                    : props.items.minSalary + '-' + props.items.maxSalary}
                        />
                    )}
                    {props.items.datePosted && (
                        <SmallLists
                            icon={<HourglassTopIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1 "
                            />}
                            items={new Date(props.items.datePosted)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                    {props.items.datePosted && (
                        <SmallLists
                            icon={<HourglassTopIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1 "
                            />}
                            items={new Date(props.items.datePosted)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                </ul>
            </div>
            <div className="col-span-12 w-full text-[#20262E] text-sm leading-[24px] my-5 md:my-0 md:mt-2 overflow-hidden max-h-[45%] sm:max-h-[90%] pr-2">
                <div className="w-full">
                    <div
                        className="overflow-ellipsis"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                        }}
                        dangerouslySetInnerHTML={{ __html: props.items.jobDescription }}
                    />
                </div>
            </div>
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.items.$id} />
        </div>
    )
}

export default JobListCard