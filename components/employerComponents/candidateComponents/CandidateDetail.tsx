import PersonIcon from '@mui/icons-material/Person';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EducationDetail from './EducationDetail';
import WorkDetail from './WorkDetail';
import ProjectDetail from './ProjectDetail';
import Link from 'next/link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { downLoadResume } from '@/lib/services';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
const CandidateDetail = (props: any) => {
    const pdfIcon = '/images/pdf2.svg';

    return (
        <div className="flex flex-col gap-y-3 p-5 rounded-2xl">
            {
                props && props.detailData &&
                < div className="flex gap-x-2">
                    {props.imageLinkValue && <img src={props.imageLinkValue} className="w-16 h-16 rounded-xl" />}
                    <div className="col-span-7 flex flex-col">
                        {props.detailData.name && <p className="text-neutral-900 text-lg font-medium">{props.detailData.name}</p>}
                        {/*                         <p className="text-stone-300 text-sm font-normal">{props.detailData.bioHeadline}</p>
 */}                        <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                            {props.detailData.address && <> <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> {props.detailData.address}</>}
                        </p>
                    </div>
                </div>
            }
            {/* {props && props.detailData && <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="text-stone-300 text-sm font-light leading-normal">
                    {props.detailData.bioDescription}
                </div>
            </div>
            } */}
            {
                props && props.detailData && (
                    <div className="flex gap-x-5 text-[#618c61]">
                        {props.detailData.linkedIn && (
                            <Link target="_blank" title="linkedIn" href={props.detailData.linkedIn}>
                                <LinkedInIcon className="w-7 h-7 hover:text-gradientSecond" />
                            </Link>
                        )}
                        {props.detailData.github && (
                            <Link target="_blank" title="github" href={props.detailData.github}>
                                <GitHubIcon className="w-7 h-7 hover:text-gradientSecond" />
                            </Link>
                        )}
                        {props.detailData.behance && (
                            <Link target="_blank" title="behance" href={props.detailData.behance}>
                                <FormatBoldIcon className="w-8 h-8 hover:text-gradientSecond" />
                            </Link>
                        )}
                        {props.detailData.protfolio && (
                            <Link target="_blank" title="portifolio" href={props.detailData.protfolio}>
                                <PhonelinkIcon className="w-7 h-7 hover:text-gradientSecond" />
                            </Link>
                        )}
                    </div>
                )
            }
            {
                props && props.detailData && props.detailData.coverLetter && (
                    <div className="pb-5 flex-grow max-sm:h-60">
                        <p className="font-fhW text-fhS leading-fhL">
                            <TextSnippetIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                            Cover Letter
                        </p>
                        <div
                            className="border-0 pt-3 text-stone-400 focus:border-0 focus:ring-0 h-full max-h-[80%] w-full overflow-y-auto overflow-x-hidden hideScrollBar"
                            dangerouslySetInnerHTML={{ __html: props.detailData.coverLetter }}
                        />
                    </div>
                )
            }
            <div className="flex gap-2 gap-y-3 flex-wrap my-2">
                {props &&
                    props.detailData &&
                    props.detailData.skills && <p className="font-fhW text-fhS leading-fhL w-full">
                        <LocalFireDepartmentOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                        Skills
                    </p>}
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
            {
                props.detailData && props.detailData.workHistory && (
                    <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                        <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                            <BusinessCenterIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                            Work History
                        </p>
                        {props &&
                            props.detailData &&
                            props.detailData.workHistory &&
                            JSON.parse(props.detailData.workHistory).map((item: any, index: number) => {
                                return <WorkDetail key={index} detail={item} />;
                            })}
                    </div>
                )
            }
            {
                props && props.detailData && props.detailData.educations && (
                    <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                        <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                            <SchoolOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                            Education
                        </p>
                        {props &&
                            props.detailData &&
                            props.detailData.educations &&
                            JSON.parse(props.detailData.educations).map((item: any, index: number) => {
                                return <EducationDetail key={index} detail={item} />;
                            })}
                    </div>
                )
            }
            {
                props && props.detailData && props.detailData.projects && (
                    <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                        <p className="font-fhW text-fhS leading-fhL col-span-12">
                            <AttachFileIcon sx={{ marginRight: '0.5rem', rotate: '40deg' }} className='text-gradientFirst' />
                            Projects
                        </p>
                        {props &&
                            props.detailData &&
                            props.detailData.projects &&
                            JSON.parse(props.detailData.projects).map((item: any, index: number) => {
                                return <ProjectDetail key={index} detail={item} />;
                            })}
                    </div>
                )
            }
            {props &&
                props.detailData &&
                props.detailData.resumeId && (
                    <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                        <p className="font-fhW text-fhS leading-fhL col-span-12">
                            <FileCopyOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                            Resume
                        </p>
                        <div className="col-span-12 grid grid-cols-12 shadow border border-gradientFirst rounded-3xl mt-5">
                            <div className="py-4 flex items-center justify-center bg-gradientFirst rounded-tl-3xl rounded-bl-3xl shadow col-span-2">
                                <img src={pdfIcon} className="w-12 h-5 relative" />
                            </div>
                            <div className="col-span-8 flex items-center pl-3 break-all">
                                <p className="text-black text-lg font-medium leading-loose sm:text-xl">resume {/* {fileName} */}</p>
                            </div>
                            <div className="col-span-2 flex items-center justify-around">
                                <div className="h-8 bg-fadedText flex w-0.5"></div>
                                <div className="col-span-12 flex items-center justify-end pt-1">
                                    <GetAppIcon
                                        className="w-9 h-9 text-fadedText cursor-pointer"
                                        onClick={() => downLoadResume(props.detailData.resumeId)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div >
    );
};
export default CandidateDetail;