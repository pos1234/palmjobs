import { getEmployerPicture, getProfilePicture } from '@/lib/services';
import React, { useEffect, useState } from 'react';

const jobImage = (props: any) => {
    const [imageUrl, setImageUrl] = useState('');

    const getEmployerPictureId = async () => {
        setImageUrl('');
        const res = await getEmployerPicture(props.id);
        if (res.documents && res.documents[0] && res.documents[0].profilePictureId) {
            const { href } = getProfilePicture(res.documents[0].profilePictureId);
            if (!href) {
                setImageUrl('');
            }
            href && setImageUrl(href);
            return href;
        }
        if (res.documents && res.documents[0] && !res.documents[0].profilePictureId) {
            setImageUrl('');
        }
    };
    useEffect(() => {
        getEmployerPictureId();
    }, [props.id]);
    return <>{imageUrl !== '' ? <img src={imageUrl} className={props.className} alt="Profiles" /> : null}</>;
};

export default jobImage;
