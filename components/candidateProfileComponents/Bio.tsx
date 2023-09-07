import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { MiddleWare } from '@/lib/middleware';
import ConfirmModal from '@/components/ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
const Bio = () => {
    const loadingIn = '/images/loading.svg';
    const { headline, setHeadline, description, loadings, setDescription, handleBio } = MiddleWare();
    const [openBio, setOpenBio] = useState(false);
    const bioMaxCharacters = 100;
    const bioDescMaxCharacters = 1000;

    return (
        <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl p-2 pt-5 pr-0 lg:pl-10 lg:p-8 md:pr-5 lg:pr-5">
            <div className="col-span-8 md:col-span-6">
                <p className="font-fhW text-fhS leading-fhL text-textR">
                    <PersonIcon sx={{ color: '#FE5E0A' }} /> {headline}
                </p>
            </div>
            <div className="col-span-4 md:col-span-6 grid justify-items-end">
                <EditIcon
                    onClick={() => setOpenBio(true)}
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                />
            </div>
            <div className="col-span-12 pt-3 md:col-span-11">
                <p className="font-smW text-smS leading-smL text-lightGrey pl-2">{description}</p>
            </div>
            {openBio && (
                <ConfirmModal isOpen={openBio} handleClose={() => setOpenBio(!openBio)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <form className="col-span-12 grid grid-cols-12" onSubmit={handleBio}>
                            <div className="col-span-12 grid grid-cols-12">
                                <div className="col-span-12 grid grid-cols-12">
                                    <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                        <PersonIcon sx={{ color: '#FE5E0A', fontSize: '2rem' }} /> Bio
                                    </p>
                                    <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                        <button onClick={() => setOpenBio(!openBio)}>
                                            <CloseIcon
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-8 h-8 p-2 "
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-8 mt-5 pr-2 md:pl-10">
                                    <p className="font-fhW text-bigS leading-fhL text-modalTitle text-center md:text-left">
                                        Introduce yourself to the community.
                                    </p>
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">
                                        Headline
                                        <span className="float-right text-fadedText text-numS">
                                            {bioMaxCharacters - headline.length} / {bioMaxCharacters}
                                        </span>
                                    </p>

                                    <input
                                        value={headline}
                                        required
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (e.currentTarget.value.length <= bioMaxCharacters) {
                                                setHeadline(e.currentTarget.value);
                                            }
                                        }}
                                        placeholder="Marketing Manager"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />

                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">
                                        Description
                                        <span className="float-right text-fadedText text-numS">
                                            {bioDescMaxCharacters - description.length} / {bioDescMaxCharacters}
                                        </span>
                                    </p>
                                    <textarea
                                        value={description}
                                        required
                                        onChange={(e) => {
                                            if (e.currentTarget.value.length <= bioDescMaxCharacters) {
                                                setDescription(e.currentTarget.value);
                                            }
                                        }}
                                        placeholder="Describe yourself...."
                                        className="border-[1px] w-full rounded-xl resize-none pt-3 pl-5 h-36 text-addS"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6"></div>
                            <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                {loadings == true ? (
                                    <img
                                        src={loadingIn}
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    />
                                ) : (
                                    <button
                                        type="submit"
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default Bio;
