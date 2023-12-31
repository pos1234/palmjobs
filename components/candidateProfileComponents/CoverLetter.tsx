import { insertCoverLetter } from '@/backend/candidateBackend'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import FormModal from './FormModal';
import { SubmitButton } from '../TextInput';
const CoverLetter = (props: any) => {
    const [userDetail, setUserDetail] = useState(props.userDetail)
    const [coverLetter, setCoverLetter] = useState('');
    const [openCover, setOpenCover] = useState(false);
    const [loadings, setLoadings] = useState(false)
    const coverLetterLength = 500
    const userData = async () => {
        userDetail && userDetail.coverLetter && setCoverLetter(userDetail.coverLetter)
    }
    const updateLocal = (value: any) => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail')
                    .then((existingData: any) => {
                        const updatedData = {
                            ...existingData,
                            coverLetter: value,
                        };
                        return localforage.setItem('userDetail', updatedData);
                    })
                    .then(() => {
                    })
                    .catch((err) => {
                        console.error(`Error updating item: ${err}`);
                    });
            });
        }
    }
    const handleCoverLetter = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        setLoadings(true)
        if (coverLetter !== '') {
            insertCoverLetter(coverLetter).then((res) => {
                toast.success('Updated Successfully')
                setLoadings(false);
                setOpenCover(false)
                updateLocal(coverLetter)
            }).catch((erorr) => {
                setLoadings(false);
                toast.error(`Not Updated ${erorr}`)
            })
        }
    }
    const removeHtmlTags = (html: string) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, '');
    };
    useEffect(() => {
        userData()
    }, [userDetail])
    return (
        <div className=" rounded-xl relative gap-5 p-6 border-2 flex-grow flex flex-col">
            <div className="flex justify-between">
                <p className=" font-fhW text-fhS leading-fhL flex ">
                    <TextSnippetIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                    Cover Letter
                </p>
                <div>
                    <EditIcon
                        onClick={() => setOpenCover(true)}
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 cursor-pointer"
                    />
                </div>
            </div>
            {!coverLetter && (
                <p className="font-smW text-smS leading-smL text-lightGrey pl-10 italic w-full">
                    You haven't added Cover Letter, yet.
                </p>
            )}
            <div className='w-full relative max-md:h-40 h-full overflow-y-auto thinScrollBar'>
                {
                    coverLetter &&
                    <p className="absolute w-full"> {coverLetter}</p>
                }
            </div>
            <FormModal tipText='Crafting a compelling cover letter? Start with a warm greeting, express your enthusiasm for the role, and highlight key experiences that align with the job description. Show how your unique skills can contribute to the company’s success. End with a courteous closing and an invitation for further discussion. Remember, your cover letter is your personal story—make it resonate with your future employer'
                text='Cover Letter' icon={<TextSnippetIcon />}
                addText='Add Cover Letter' openModal={openCover} setOpenModal={setOpenCover}>
                <form onSubmit={handleCoverLetter} className='w-full flex flex-col gap-5'>
                    <span className='text-fadedText self-end'>{`${coverLetter.length} / ${coverLetterLength}`}</span>
                    <textarea
                        style={{ resize: 'none' }}
                        className="border-2 sm:p-6 rounded-xl focus:border-gradientFirst focus:ring-0 w-full overflow-y-auto max-md:h-[18rem] h-full overflow-x-hidden thinScrollBar"
                        value={coverLetter ? removeHtmlTags(coverLetter) : ''}
                        onChange={(e) => {
                            if (removeHtmlTags(e.currentTarget.value).length <= coverLetterLength) {
                                setCoverLetter(e.currentTarget.value)
                            }
                        }}
                    />
                    <div className='w-full flex md:justify-end'>
                        <div className='w-full md:w-80'>
                            <SubmitButton loading={loadings} buttonText="Save" />
                        </div>
                    </div>
                </form>
            </FormModal>
        </div>
    )
}

export default CoverLetter
/* do not delet before creating modal for it 

 <div className='flex justify-between'>
                <p className="font-shW text-midS leading-shL">Cover Letter</p>
                <p className='mr-5 text-fadedText'>{`${coverLetter.length} / ${coverLetterLength}`}</p>
            </div>
            <textarea
                style={{ resize: 'none' }}
                className="border-0 focus:border-0 focus:ring-0 h-full max-h-[80%] w-full overflow-y-auto overflow-x-hidden"
                value={coverLetter ? removeHtmlTags(coverLetter) : ''}
                onChange={(e) => {
                    if (removeHtmlTags(e.currentTarget.value).length <= coverLetterLength) {
                        setCoverLetter(e.currentTarget.value)
                    }
                }}
                onBlur={handleCoverLetter}
            />*/