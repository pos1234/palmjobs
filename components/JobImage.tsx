import { getEmployerPicture } from '@/backend/employerBackend';
import React, { useEffect, useState } from 'react';
import { getProfilePictures } from '@/backend/candidateBackend';
import Image from 'next/image';
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
    return <>{imageUrl !== '' ? <Image width={100} height={100}
        src={imageUrl} className={props.className} alt="Profiles" /> : null}</>;
};
export const jobImages = (id: string) => {
    const [imageUrl, setImageUrl] = useState('');
    const [companyName, setCompanyName] = useState('');

    const getEmployerPictureId = async () => {
        setImageUrl('');
        const res = await getEmployerPicture(id);
        if (res.documents && res.documents[0] && res.documents[0].companyName) {
            setCompanyName(res.documents[0].companyName);
        } else {
            setCompanyName('');
        }
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
    }, [id]);
    return { imageUrl, companyName };
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
    return <> {imageUrl !== '' ? <Image src={imageUrl} width={100} height={100} className={props.className} alt="Profiles" /> : null}</>;
};


