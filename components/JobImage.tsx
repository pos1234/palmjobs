import { getEmployerPicture } from '@/lib/employerBackend';
import React, { useEffect, useState } from 'react';
import { getProfilePictures } from '@/lib/candidateBackend';
const jobImage = (props: any) => {
    const [imageUrl, setImageUrl] = useState('');

    const getEmployerPictureId = async () => {
        setImageUrl('');
        const res = await getEmployerPicture(props.id);
        if (res.documents && res.documents[0] && res.documents[0].profilePictureId) {
            getProfilePictures(res.documents[0].profilePictureId).then((response) => {
                setImageUrl(response.href)
                if (!response.href) {
                    setImageUrl('');
                }
            })
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
export const ProfilePic = (props: any) => {
    const [imageUrl, setImageUrl] = useState('');
    const getEmployerPictureId = async () => {
        setImageUrl('');
        getProfilePictures(props.id).then((res) => {
            setImageUrl(res.href)
        })
    };
    useEffect(() => {
        getEmployerPictureId();
    }, [props.id]);
    return <> {imageUrl !== '' ? <img src={imageUrl} className={props.className} alt="Profiles" /> : null}</>;
};


