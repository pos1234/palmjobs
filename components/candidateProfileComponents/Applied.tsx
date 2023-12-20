import { fetchAppliedJobIds } from '@/backend/candidateBackend';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppliedCard from './AppliedComponent/AppliedCard';
if (typeof window !== 'undefined') {
    import('localforage').then((localforage) => {
    });
}
/* import localforage from 'localforage';
 *//* const ReturnName = (props: any) => {
const [companyName, setCompanyName] = useState('');
const documents = getCompanyData(props.id);
documents.then(async (res) => {
 if (res.documents && res.documents[0] && res.documents[0].description) {
     setCompanyName(res.documents[0].companyName);
 } else {
     setCompanyName('');
 }
});
return <div className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">{companyName}</div> || null;
}; */
const Applied = (props: any) => {
    const [userData, setUserData] = useState<any>()
    const [appliedJobId, setAppliedJobId] = useState<any[]>([]);
    const [allLoading, setAllLoading] = useState(false);
    const appliedJobsId = () => {
        setAllLoading(true);
        userData && fetchAppliedJobIds(userData.$id).then((res) => {
            setAllLoading(false);
            setAppliedJobId(res.documents)
            if (typeof window !== 'undefined') {
                import('localforage').then((localforage) => {
                    localforage.setItem('appliedJobIds', res.documents).then((res) => {
                    })
                });
            }
        })
    };
    const fetchApplied = () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('appliedJobIds').then((value: any) => {
                    if (value) {
                        setAllLoading(false);
                        setAppliedJobId(value)
                    }
                    if (!value) {
                        appliedJobsId();
                    }
                })
            });
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userData').then((value: any) => {
                    if (value) {
                        fetchApplied()
                        setUserData(value)
                        appliedJobsId();

                    }
                })
            });
        }
    }, []);
    return (
        <>
            {!allLoading && appliedJobId.length == 0 && props.view && (
                <div className="col-span-12 text-center py-5 px-2 flex flex-col items-center gap-y-8">
                    <p>No applied jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-black text-textW h-14 rounded-[3px] flex justify-center items-center text-textW cursor-pointer hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
                    >
                        Find Job
                    </Link>
                </div>
            )}
            {appliedJobId &&
                !allLoading && appliedJobId.length !== 0 &&
                appliedJobId.map((datas: any, index: number) => {
                    return (<div key={index}>
                        <AppliedCard RefetchSaved={appliedJobsId} datas={datas} view={props.view} />
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
export default Applied;
