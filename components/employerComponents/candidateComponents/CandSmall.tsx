import { fetchCandidateDetail } from '@/backend/employerBackend';
import { useEffect, useState } from 'react';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import { ProfilePic } from '@/components/JobImage';
const CandSmall = (props: any) => {
    const [candidateData, setCandidateData] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [active, seActive] = useState(false);
    const [skill, setSkill] = useState<any>([]);
    const [imageHref, setImageHref] = useState('');
    useEffect(() => {
        props.itemDetail.candidateId && fetchCandidateDetail(props.itemDetail.candidateId).then((res) => {
            setCandidateData(res.documents.length > 0 && res.documents[0]);
            props.detailHolder(res.total > 0 && res.documents[0]);
            const parsed = res.documents[0] && res.documents[0].skills && res.documents[0].skills;
            const imageLink = res.documents[0] && res.documents[0].skills && res.documents[0].profilePictureId !== null
            imageLink ? setImageHref(res.documents[0].profilePictureId) : setImageHref('')
            setSkill(res.documents[0] && res.documents[0].skills && parsed);
        });
    }, []);
    return (
        <div
            key={props.index}
            id={`item-${props.index}`}
            onClick={() => {
                props.setDocumentId && props.setDocumentId(props.itemDetail)
                props.detailHolder(candidateData);
                props.imageLinkSetter(imageHref);
                props.detailHolder(candidateData);
                props.indexSetter(props.index);
                props.detailSetter(true);
            }}
            className={
                props.detailValue == true
                    ? `bg-textW border-[1px] shadow flex flex-col p-3 rounded-lg cursor-pointer max-md:hidden ${props.index === props.indexValue
                        ? 'border-gradientFirst'
                        : 'border-stone-200'
                    }`
                    : `bg-textW border-[1px] shadow flex flex-col p-3 rounded-lg cursor-pointer ${props.index === props.indexValue
                        ? 'border-gradientFirst'
                        : 'border-stone-200'
                    } `
            }
        >
            <div className="flex justify-between">
                <div className="flex gap-3">
                    {imageHref && <ProfilePic id={imageHref} className=" w-16 h-16 md:col-span-4 rounded-xl" />}
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-900 text-md font-medium">{candidateData && candidateData.name}</p>
                        {candidateData && candidateData.address && (
                            <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                                <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} />
                                {candidateData.address}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 flex-wrap my-2">
                {candidateData &&
                    skill &&
                    skill.map((item: any, index: number) => {
                        return (<div key={index}>
                            {
                                index < 3 && <p
                                    key={index}
                                    className="px-2 py-1 flex items-center bg-skillColor text-gradientFirst text-sm font-normal leading-tight"
                                >
                                    {item}
                                </p>
                            }

                        </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default CandSmall;
