import PersonIcon from '@mui/icons-material/Person';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EducationDetail from './EducationDetail';
import WorkDetail from './WorkDetail';
import ProjectDetail from './ProjectDetail';
const CandidateDetail = (props: any) => {
    return (
        <div className="flex flex-col gap-y-3 p-5 rounded-2xl">
            <div className="flex gap-x-2">
                {props.imageLinkValue && <img src={props.imageLinkValue} className="w-16 h-16 rounded-xl" />}
                <div className="col-span-7 flex flex-col">
                    <p className="text-neutral-900 text-lg font-medium">Jane Doe</p>
                    <p className="text-stone-300 text-sm font-normal">{props && props.detailData && props.detailData.bioHeadline}</p>
                    <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                        <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> {props && props.detailData && props.detailData.address}
                    </p>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="text-stone-300 text-sm font-light leading-normal">
                    {props && props.detailData && props.detailData.bioDescription}
                </div>
            </div>
            <div className="flex gap-2 gap-y-3 flex-wrap my-2">
                <p className="font-fhW text-fhS leading-fhL w-full">
                    <LocalFireDepartmentOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Skills
                </p>
                {props &&
                    props.detailData &&
                    props.detailData.skills &&
                    props.detailData.skills.map((item: any, index: number) => {
                        return (
                            <p
                                key={index}
                                className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight"
                            >
                                {item}
                            </p>
                        );
                    })}
            </div>
            {props.detailData && props.detailData.workHistory && (
                <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                    <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                        <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                        Work History
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.workHistory &&
                        JSON.parse(props.detailData.workHistory).map((item: any, index: number) => {
                            return <WorkDetail key={index} detail={item} />;
                        })}
                </div>
            )}
            {props && props.detailData && props.detailData.educations && (
                <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                    <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                        <SchoolOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                        Education
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.educations &&
                        JSON.parse(props.detailData.educations).map((item: any, index: number) => {
                            return <EducationDetail key={index} detail={item} />;
                        })}
                </div>
            )}
            {props && props.detailData && props.detailData.projects && (
                <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                    <p className="font-fhW text-fhS leading-fhL col-span-12">
                        <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} />
                        Projects
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.projects &&
                        JSON.parse(props.detailData.projects).map((item: any, index: number) => {
                            return <ProjectDetail key={index} detail={item} />;
                        })}
                </div>
            )}
        </div>
    );
};
export default CandidateDetail;
