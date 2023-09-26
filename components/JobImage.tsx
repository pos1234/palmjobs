import { getEmployerPicture, getProfilePicture } from '@/lib/services';
import React, { useEffect, useState } from 'react';

const jobImage = (props: any) => {
    const [imageUrl, setImageUrl] = useState('');

    const getEmployerPictureId = async () => {
        setImageUrl('');
        const res = await getEmployerPicture(props.id);
        if (res.documents && res.documents[0] && res.documents[0].profilePictureId) {
            const { href } = getProfilePicture(res.documents[0].profilePictureId);
            setImageUrl(href);
            return href;
        }
    };
    useEffect(() => {
        getEmployerPictureId();
    }, [props.id]);
    return <>{imageUrl !== '' ? <img src={imageUrl} className={props.className} alt="Profile" /> : null}</>;
};

export default jobImage;
