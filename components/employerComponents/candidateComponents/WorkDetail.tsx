import { useState } from 'react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const WorkDetail = (props: any) => {
    const [desc, setDesc] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDescription = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div onClick={() => setDesc(!desc)} className="col-span-12 pb-2 border-b-2 flex items-between justify-between md:max-xl:flex-col my-4">
            <div className="w-12 h-12  bg-skillColor flex items-center justify-center rounded-[1rem] md:max-xl:w-full md:max-xl:bg-textW md:flex md:max-xl:justify-start md:max-xl:gap-x-2">
                <div className="w-12 h-12 bg-skillColor  items-center justify-center rounded-[1rem] hidden md:max-xl:flex">
                    <BusinessCenterOutlinedIcon
                        sx={{
                            height: '1.5rem'
                        }}
                        className='text-gradientFirst'

                    />
                </div>
                <BusinessCenterOutlinedIcon
                    sx={{
                        height: '1.5rem'
                    }}
                    className="md:max-xl:hidden text-gradientFirst"
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
            <div className="flex items-center justify-end pr-1 ">
                {desc ? (
                    <KeyboardArrowUpIcon
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 "
                    />
                ) : (
                    <KeyboardArrowDownIcon
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 "
                    />
                )}
            </div>
        </div>
    );
};
export default WorkDetail;
