import { getProfilePicture } from '@/lib/services';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';

const ProjectDetail = (props: any) => {
    const projectImage = (id: string) => {
        const { href } = getProfilePicture(id);
        return href;
    };
    return (
        <div /* key={index} */ className="col-span-12 flex gap-y-5 gap-x-3 pt-3">
            {props && props.detail.thumbnailId && (
                <img src={projectImage(props.detail.thumbnailId)} className="w-20 h-20 rounded-3xl" />
            )}
            <div className="grid grid-cols-12  h-full">
                <div className="col-span-10">
                    <p className="text-shS font-shW leading-shL flex md:max-lg:text-[15px]">
                        {props && props.detail && props.detail.projectName}
                    </p>
                    {props && props.detail && props.detail.detail && (
                        <div
                            dangerouslySetInnerHTML={{ __html: props.detail.detail }}
                            className=" text-lightGrey pr-3 md:max-lg:text-[12px] md:max-lg:pr-0"
                        />
                    )}
                </div>
                {props && props.detail && props.detail.link && (
                    <a
                        className="text-gradientFirst col-span-12 flex items-center cursor-pointer mt-2"
                        target="_blank"
                        href={props.detail.link}
                    >
                        <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                        <span className="underline pl-3 md:max-lg:pl-1">Project Link</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
