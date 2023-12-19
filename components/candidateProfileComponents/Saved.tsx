import { fetchSavedJobIds } from '@/backend/candidateBackend';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import localforage from 'localforage';
import SaveCard from './SavedComponent/SaveCard';
const SavedJobs = (props: any) => {
    /*     const { userData } = useGlobalContext()
     */
    const [userData, setUserData] = useState<any>()
    const [savedJobs, setSavedJobs] = useState<any>();
    const [allLoading, setAllLoading] = useState(false);
    const fetchSaveds = () => {
        setAllLoading(true);
        userData && fetchSavedJobIds(userData.$id).then((res: any) => {
            setAllLoading(false);
            res && setSavedJobs(res.documents)
            localforage.setItem('savedJobIds', res.documents).then((res) => {
            })
        }).catch((error) => {
            setAllLoading(false)
            console.log(error);
        })
    }
    const fetchSaved = () => {
        localforage.getItem('savedJobIds').then((value) => {
            if (value) {
                setAllLoading(false);
                setSavedJobs(value)
            }
            if (!value) {
                fetchSaveds()
            }
        })
    }
    useEffect(() => {
        fetchSaved()
        localforage.getItem('userData').then((value: any) => {
            if (value) {
                setUserData(value)
            }
        })
    }, []);
    return (
        <>
            {!allLoading && (savedJobs && savedJobs.length == 0) && props.view && (
                <div className="col-span-12 text-center py-5 px-2 flex flex-col items-center gap-y-8">
                    <p>No saved jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-black text-textW h-14 rounded-[3px] flex justify-center items-center text-textW cursor-pointer hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
                    >
                        Find Job
                    </Link>
                </div>
            )}
            {savedJobs &&
                !allLoading && savedJobs.length !== 0 &&
                savedJobs.map((datas: any, index: number) => {
                    return (<div key={index} className='overflow-x-hidden'>
                        <SaveCard RefetchSaved={fetchSaveds} datas={datas} view={props.view} />
                    </div>
                    );
                })}
            {allLoading && (
                <div className="col-span-12 flex flex-col gap-3 gap-y-10 p-3">
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};
export default SavedJobs;
