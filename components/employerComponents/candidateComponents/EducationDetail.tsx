import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const EducationDetail = (props: any) => {
    return (
        <div className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col my-4">
            <div className="w-12 h-12  bg-skillColor flex items-center justify-center rounded-[1rem] md:max-xl:w-full md:max-xl:bg-textW md:flex md:max-xl:justify-start md:max-xl:gap-x-2">
                <div className="w-12 h-12 bg-skillColor  items-center justify-center rounded-[1rem] hidden md:max-xl:flex">
                    <SchoolIcon
                        sx={{
                            color: '#FE5E0A',
                            height: '1.5rem'
                        }}
                    />
                </div>
                <SchoolIcon
                    sx={{
                        color: '#FE5E0A',
                        height: '1.5rem'
                    }}
                    className="md:max-xl:hidden"
                />
                <p className="text-fhS font-fhW leading-fhL md:text-[1rem] md:font-smRW hidden md:max-xl:flex">
                    {props && props.detail && props.detail.educationLevel}
                </p>
            </div>
            <div className="grid grid-cols-12 pl-5">
                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                    {props && props.detail && props.detail.educationLevel}
                </p>
                <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                    <p className="text-[14px]">
                        <ArticleIcon sx={{ marginRight: '0.5rem', marginTop: '0rem', fontSize: '0.9rem' }} />
                        {props && props.detail && props.detail.fieldStudy}
                    </p>
                    <div className="text-[14px]">
                        <LocationCityIcon sx={{ marginRight: '0.3rem', marginTop: '-0.1rem', fontSize: '0.9rem' }} />{' '}
                        {props && props.detail && props.detail.university}
                    </div>
                    <div className="flex">
                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                        <span className="flex flex-wrap text-[14px] md:max-lg:text-[13px]">
                            <p>{props && props.detail && props.detail.yearIssued}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EducationDetail;
