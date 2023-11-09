import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getEmployerDocument, getProfileData, updateProfile, updateUserName } from '@/lib/employerBackend';
import { toast } from 'react-toastify';
import { EmployerProfilePicture } from '../candidateProfileComponents/ProfilePicture';
import { getAccount } from '@/lib/accountBackend';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const TextInput = (props: any) => {
    return (
        <input
            placeholder={props.placeHolder}
            value={props.value}
            onChange={(e) => props.setFunction(e.currentTarget.value)}
            className=" h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:border-orange-500 focus:ring-0 w-full md:w-96"
        />
    );
};
const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-md font-medium sm:leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium sm:leading-loose'}>*</span>
        </div>
    );
};
const EmployerProfile = (props: any) => {
    const loadingIn = '/images/loading.svg';
    const [companyName, setCompanyName] = useState('');
    const [userName, setUserName] = useState('');
    const [industry, setIndustry] = useState('');
    const [address, setAddress] = useState('');
    const [noEmployee, setNoEmployee] = useState('');
    const [phone, setPhone] = useState('');
    const [compDescription, setCompDescription] = useState('');
    const [webLink, setWebLink] = useState('');
    const [loading, setLoading] = useState(false);
    const initialData = async () => {
        const { documents }: any = await getEmployerDocument();
        if (documents) {
            setCompanyName(documents[0].companyName);
            setIndustry(documents[0].sector);
            setAddress(documents[0].location);
            setNoEmployee(documents[0].noOfEmployee);
            setPhone(documents[0].phoneNumber);
            setWebLink(documents[0].websiteLink);
            setCompDescription(documents[0].description);
        }
    };
    useEffect(() => {
        initialData();
        getAccount().then((res: any) => {
            res && res.name && setUserName(res.name);
        });
    }, []);
    const handleProfile = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        updateProfile(companyName, industry, address, noEmployee, phone, webLink, compDescription)
            .then(() => {
                toast.success('Successfully Updated Profile');
                updateUserName(userName);
                setLoading(false);
                if (props.setFilled) {
                    props.setFilled(false);
                }
            })
            .catch((error) => {
                toast.error('Profile Not Updated');
                console.log(error);
                setLoading(false);
            });
    };
    return (
        <form className="pt-5  pb-10 bg-textW px-2 sm:pl-10 xl:pr-28 xl:px-20" onSubmit={handleProfile}>
            <div className="col-span-12 pt-5 space-y-3 mb-3">
                <EmployerProfilePicture />
                <div className="text-neutral-900  font-semibold text-2xl leading-10 md:text-3xl">Create employer account</div>
                <RequiredTextLabel text="Your Company Name?" />
                <TextInput placeHolder="company name" value={companyName} setFunction={setCompanyName} />
                <RequiredTextLabel text="Your Name?" />
                <TextInput placeHolder="your name" value={userName} setFunction={setUserName} />
                <RequiredTextLabel text="Your Company's Industry?" />
                <select
                    className=" h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:border-orange-500 focus:ring-0 cursor-pointer w-full md:w-96"
                    value={industry}
                    onChange={(e) => {
                        setIndustry(e.currentTarget.value);
                    }}
                >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Construction">Construction</option>
                    <option value="Education">Education</option>
                    <option value="Energy">Energy</option>
                    <option value="Finance & Insurance">Finance & Insurance</option>
                    <option value="HealthCare">HealthCare</option>
                    <option value="Hospital and Tourism">Hospital and Tourism</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Mining">Mining</option>
                    <option value="Public Administration">Public Administration</option>
                    <option value="Real State">Real State</option>
                    <option value="Transportation & Logisitics">Transportation & Logisitics</option>
                    <option value="Wholesale Trade">Wholesale Trade</option>
                    <option value="Creative & Media">Creative & Media</option>
                    <option value="Automative">Automative</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                </select>
                <RequiredTextLabel text="Your Company's number of employee?" />
                <input
                    type="number"
                    className=" h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:border-orange-500 focus:ring-0 hideIncrease w-full md:w-96"
                    value={noEmployee}
                    onChange={(e) => setNoEmployee(e.currentTarget.value)}
                />
                <RequiredTextLabel text="Your Phone Number?" />
                <TextInput placeHolder="phone number" value={phone} setFunction={setPhone} />
                <RequiredTextLabel text="Company Location ?" req="nReq" />
                <TextInput placeHolder="address" value={address} setFunction={setAddress} />
                <RequiredTextLabel text="Website Link ?" req="nReq" />
                <TextInput placeHolder="web Link" value={webLink} setFunction={setWebLink} />
            </div>
            <RequiredTextLabel text="Company Description ?" req="nReq" />
            <div className="pb-20 mr-2 mt-5 xl:mr-64">
                <ReactQuill
                    className="h-28 text-addS"
                    value={compDescription}
                    onChange={(e) => setCompDescription(e)}
                    placeholder="Add Description"
                />
            </div>
            <div className="flex justify-end pt-5">
                {!loading && (
                    <button
                        type="submit"
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16  rounded-full w-7/12 md:w-5/12 lg:w-3/12"
                    >
                        Save
                    </button>
                )}
                {loading && (
                    <img
                        src={loadingIn}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-full w-7/12 md:w-5/12 lg:w-3/12"
                    />
                )}
            </div>
        </form>
    );
};
export default EmployerProfile;
