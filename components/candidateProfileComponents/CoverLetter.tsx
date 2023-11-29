import { getUserDetail, insertCoverLetter } from '@/backend/candidateBackend'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import FormModal from './FormModal';
import { SubmitButton } from '../TextInput';

const CoverLetter = () => {
    const [coverLetter, setCoverLetter] = useState('');
    const [openCover, setOpenCover] = useState(false);
    const [loadings, setLoadings] = useState(false)
    const coverLetterLength = 500
    const userData = async () => {
        const userInfo = await getUserDetail()
        userInfo && userInfo.coverLetter && setCoverLetter(userInfo.coverLetter)
    }
    const handleCoverLetter = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        setLoadings(true)
        if (coverLetter !== '') {
            insertCoverLetter(coverLetter).then((res) => {
                toast.success('Updated Successfully')
                setLoadings(false);
                setOpenCover(false)
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
    }, [])
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

            <FormModal tipText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto dolore sint tenetur dolores, repellendus autem temporibus modi officia soluta. Facilis, dignissimos? Error, assumenda. Laborum, animi hic. Ab, doloremque id.'
                text='CoverLetter' icon={<TextSnippetIcon />}
                addText='Add CoverLetter' openModal={openCover} setOpenModal={setOpenCover}>
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