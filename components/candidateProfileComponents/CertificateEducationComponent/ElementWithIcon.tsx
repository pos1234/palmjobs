import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';
const ElementWithIcon = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDescription = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="grid grid-cols-12 pb-5 cursor-pointer md:mb-5 sm:max-md:gap-x-2 " onClick={toggleDescription}>
                <div className="col-span-12 pb-3 border-b-2 mr-2 max-lg:ml-1 grid grid-cols-12 lg:mr-1 lg:ml-7">
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
                        <div className="w-14 h-14 bg-skillColor flex items-center justify-center rounded-[1rem]">
                            <BusinessCenterOutlinedIcon
                                sx={{
                                    color: '#00A82D',
                                    height: '1.5rem'
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-8 grid grid-cols-12 pl-2 sm:col-span-10 sm:max-lg:pl-4 md:col-span-10 lg:pl-5">
                        <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                            {props.title}
                        </p>
                        <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 pt-2 hidden sm:grid">
                            <div className="col-span-6"> {props.companyName}</div>
                            <div className="col-span-6">
                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                {props.startDate} - {props.endDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end pr-1 sm:col-span-1 md:col-span-1 ">
                        {isOpen ? (
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
                    <div className="col-span-12 pl-2 text-[14px] font-bigW text-smRS leading-smL sm:hidden text-fadedText grid grid-cols-12 pt-2">
                        <div className="col-span-6"> {props.companyName}</div>
                        <div className="col-span-6 ">
                            <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                            {props.startDate} - {props.endDate}
                        </div>
                    </div>
                    {isOpen && (
                        <div className="col-span-12 ">
                            <div
                                className="font-smW text-smS leading-smL text-lightGrey col-span-12 pt-4 lg:pt-7 pl-1"
                                dangerouslySetInnerHTML={{ __html: props.workDescription }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ElementWithIcon