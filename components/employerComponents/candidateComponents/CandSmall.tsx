import { fetchCandidateDetail, getProfilePicture } from '@/lib/services';
import { useEffect, useState } from 'react';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const CandSmall = (props: any) => {
    const [candidateData, setCandidateData] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [active, seActive] = useState(false);
    const [skill, setSkill] = useState<any>([]);
    const [imageHref, setImageHref] = useState('');
    useEffect(() => {
        fetchCandidateDetail(props.canId).then((res) => {
            setCandidateData(res.documents.length > 0 && res.documents[0]);
            props.short !== 'true' && props.detailHolder(res.documents.length > 0 && res.documents[0]);
            const parsed = res.documents[0] && res.documents[0].skills && res.documents[0].skills;
            const imageLink =
                res.documents[0] &&
                res.documents[0].skills &&
                res.documents[0].profilePictureId !== null &&
                getProfilePicture(res.documents[0].profilePictureId);
            if (imageLink) {
                setImageHref(imageLink.href);
            }

            setSkill(res.documents[0] && res.documents[0].skills && parsed);
        });
    }, []);

    return (
        <div
            id={`item-${props.index}`}
            onClick={() => {
                props.short !== 'true' && props.detailHolder(candidateData);
                props.short !== 'true' && props.imageLinkSetter(imageHref);
                (props.short !== 'true' || props.viewShort == false) && props.detailHolder(candidateData);
                props.indexSetter(props.index);
                props.detailSetter(true);
            }}
            className={
                props.detailValue == true
                    ? `bg-textW shadow flex flex-col p-3 rounded-2xl cursor-pointer max-md:hidden ${
                          (props.short !== 'true' && props.index === props.indexValue) ||
                          (props.viewShort === false && props.index === props.indexValue)
                              ? 'border-[1px] bg-textW shadow border-orange-500 max-md:hidden'
                              : 'border-[1px] bg-textW shadow border-stone-200 max-md:hidden'
                      }`
                    : `bg-textW shadow flex flex-col p-3 rounded-2xl cursor-pointer ${
                          (props.short !== 'true' && props.index === props.indexValue) ||
                          (props.viewShort === false && props.index === props.indexValue)
                              ? 'border-[1px] bg-textW shadow border-orange-500'
                              : 'border-[1px] bg-textW shadow border-stone-200'
                      }`
            }
        >
            <div className="grid grid-cols-12 gap-x-2">
                {imageHref && <img src={imageHref} className="col-span-2 w-16 h-16 md:col-span-4 rounded-xl" />}
                <div className="col-span-9 flex flex-col md:col-span-7">
                    <p className="text-neutral-900 text-lg font-medium">John Doe</p>
                    <p className="text-stone-300 text-sm font-normal">{candidateData && candidateData.bioHeadline}</p>
                    {candidateData && candidateData.address && (
                        <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                            <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {candidateData.address}
                        </p>
                    )}
                </div>
                {props.short !== 'true' && (
                    <div
                        onClick={() => props.handleFunction(props.canId)}
                        title="Shortlist"
                        className="col-span-1 cursor-pointer flex text-gradientFirst justify-center "
                    >
                        <AddIcon />
                    </div>
                )}
                {props.short === 'true' && (
                    <div title="Remove" className="col-span-1 cursor-pointer flex text-gradientFirst justify-center ">
                        <RemoveIcon onClick={() => props.handleFunction(props.itemId)} />
                    </div>
                )}
            </div>
            <div className="flex gap-2 flex-wrap my-2">
                {candidateData &&
                    skill &&
                    skill.map((item: any, index: number) => {
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
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="h-10 overflow-hidden text-stone-300 text-sm font-light leading-normal">
                    {candidateData && candidateData.bioDescription}
                </div>
            </div>
        </div>
    );
};
export default CandSmall;
