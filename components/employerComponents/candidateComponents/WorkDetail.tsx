import { useState } from 'react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const WorkDetail = (props: any) => {
    const [desc, setDesc] = useState(false);
    return (
        <div onClick={() => setDesc(!desc)} className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col my-4">
            <div className="w-12 h-12  bg-skillColor flex items-center justify-center rounded-[1rem] md:max-xl:w-full md:max-xl:bg-textW md:flex md:max-xl:justify-start md:max-xl:gap-x-2">
                <div className="w-12 h-12 bg-skillColor  items-center justify-center rounded-[1rem] hidden md:max-xl:flex">
                    <BusinessCenterOutlinedIcon
                        sx={{
                            color: '#FE5E0A',
                            height: '1.5rem'
                        }}
                    />
                </div>
                <BusinessCenterOutlinedIcon
                    sx={{
                        color: '#FE5E0A',
                        height: '1.5rem'
                    }}
                    className="md:max-xl:hidden"
                />
                <p className="text-fhS font-fhW leading-fhL md:text-[1rem] md:font-smRW hidden md:max-xl:flex">
                    {props && props.detail && props.detail.companyName}
                </p>
            </div>

            <div className="grid grid-cols-12 pl-5">
                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                    {props && props.detail && props.detail.title}
                </p>
                <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                    <div className="text-[14px]"> {props && props.detail && props.detail.companyName}</div>
                    <div className="flex">
                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                        <span className="flex flex-wrap text-[14px] md:max-xl:text-[13px]">
                            {props && props.detail && props.detail.startDate} &nbsp; - &nbsp;{props && props.detail && props.detail.endDate}
                        </span>
                    </div>
                </div>
                {desc && props && props.detail && (
                    <div
                        className="col-span-12 text-[13px] text-stone-500"
                        dangerouslySetInnerHTML={{ __html: props.detail.jobDescription }}
                    />
                )}
            </div>
            {/*  {desc && props && props.detail && (
                <div className="w-full block" dangerouslySetInnerHTML={{ __html: props.detail.jobDescription }} />
            )} */}
        </div>
    );
};
export default WorkDetail;
