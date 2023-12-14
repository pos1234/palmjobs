import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { updateProfile, updateUserName } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
import { EmployerProfilePicture } from '@/components/candidateProfileComponents/ProfilePicture';
import TextInput, { SubmitButton } from '@/components/TextInput';
import Link from 'next/link';
import { useGlobalContext } from '@/contextApi/userData';
import { RequiredTextLabel } from './jobPostTabs/RequiredTextLabel';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const EmployerProfile = (props: any) => {
    const { userData, userDetail } = useGlobalContext()
    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [industry, setIndustry] = useState('');
    const [industryError, setIndustryError] = useState('')
    const [address, setAddress] = useState('');
    const [noEmployee, setNoEmployee] = useState('');
    const [noEmployeeError, setNoEmployeeError] = useState('');
    const [phone, setPhone] = useState<any>();
    const [phoneError, setPhoneError] = useState('');
    const [compDescription, setCompDescription] = useState('');
    const [webLink, setWebLink] = useState('');
    const [loading, setLoading] = useState(false);
    const initialData = () => {
        if (userDetail && !companyName) {
            userDetail.companyName !== null && setCompanyName(userDetail.companyName);
            userDetail.sector !== null && setIndustry(userDetail.sector);
            userDetail.location !== null && setAddress(userDetail.location);
            userDetail.noOfEmployee !== null && setNoEmployee(userDetail.noOfEmployee);
            userDetail.phoneNumber !== null && setPhone(userDetail.phoneNumber);
            userDetail.websiteLink !== null && setWebLink(userDetail.websiteLink);
            userDetail.description !== null && setCompDescription(userDetail.description);
        }
        if (userData) {
            userData.name !== null && setUserName(userData.name)
        }
    };
    const isValidPhone = (phones: string) => {
        const result = phones && isValidPhoneNumber(phones.toString())
        return result
    }
    useEffect(() => {
        initialData();
    }, [userDetail]);
    const validateLink = (link: string) => {
        if (link && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
        return link;
    };
    const handleProfile = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setCompanyNameError('')
        setUserNameError('')
        setNoEmployeeError("")
        setPhoneError('')
        setPhoneError('')
        if (companyName == '') {
            setCompanyNameError('Please provide company name')
        } else if (userName == '') {
            setUserNameError('Please provide name')
        } else if (industry == '') {
            setIndustryError('Please select industry')
        } else if (userName == '') {
            setUserNameError('Please provide name')
        } else if (noEmployee == '') {
            setNoEmployeeError("Please provide number of employer's")
        } else if (phone == '') {
            setPhoneError('Please provide phone number')
        } else if (phone !== '' && !isValidPhone(phone)) {
            setPhoneError('Invalid phone number')
        } else {
            setLoading(true);
            updateProfile(companyName, industry, address, noEmployee, phone, validateLink(webLink), compDescription)
                .then(() => {
                    toast.success('Successfully Updated Profile');
                    updateUserName(userName);
                    setLoading(false);
                    props.setFilled(true);
                })
                .catch((error) => {
                    toast.error('Profile Not Updated');
                    console.log(error);
                    setLoading(false);
                });
        }

    };
    return (
        <form className="pt-5 pl-10 xl:pl-5 px-3 pb-10 bg-textW w-full max-xl:flex-grow xl:w-2/3 min-h-screen" onSubmit={handleProfile}>
            <div className="col-span-12 pt-5 space-y-3 mb-3">
                <EmployerProfilePicture />
                <RequiredTextLabel text="Your Company Name?" />
                <TextInput placeHolder="" errorMessage={companyNameError} value={companyName} setFunction={setCompanyName} />
                <RequiredTextLabel text="Your Name?" />
                <TextInput placeHolder="your name" errorMessage={userNameError} value={userName} setFunction={setUserName} />
                <RequiredTextLabel text="Your Company's Industry?" />
                <select
                    className=" h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:border-gradientFirst focus:ring-0 cursor-pointer w-full md:w-96"
                    value={industry}
                    onChange={(e) => {
                        setIndustry(e.currentTarget.value);
                    }}
                >
                    <option value="">Select an Industry</option>
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
                    <option value="Automative">Automotive</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                </select>
                {industryError && <p className="text-red-500 text-[13px] mt-2">{industryError}</p>}
                <RequiredTextLabel text="Number of Employees in Your Company?" />
                <select
                    className=" h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:border-gradientFirst focus:ring-0 cursor-pointer w-full md:w-96"
                    value={noEmployee}
                    onChange={(e) => {
                        setNoEmployee(e.currentTarget.value);
                    }}
                >
                    <option value="">Select number of employees</option>
                    <option value="1 to 10 Employees">1 to 10 Employees</option>
                    <option value="11 to 50 Employees">11 to 50 Employees</option>
                    <option value="51 to 200 Employees">51 to 200 Employees</option>
                    <option value="201 to 500 Employees">201 to 500 Employees</option>
                    <option value="501 to 1,000 Employees">501 to 1,000 Employees</option>
                    <option value="1,000+ Employees">1,000+ Employees</option>
                </select>
                {/* <input
                    type="number"
                    className=" h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:border-gradientFirst focus:ring-0 hideIncrease w-full md:w-96"
                    value={parseInt(noEmployee, 10)}
                    onChange={(e) => setNoEmployee(e.currentTarget.value.toString())}
                /> */}
                {noEmployeeError && <p className="text-red-500 text-[13px] mt-2">{noEmployeeError}</p>}
                <RequiredTextLabel text="Your Phone Number?" />
                <PhoneInput
                    defaultCountry="ET"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    className={`phoneInput h-12 pl-5 bg-white rounded-lg border-[1px] focus:ring-gradientFirst focus:border-0 w-full md:w-96 
                    ${phoneError ? 'border-red-500' : 'border-gray-200'}
                    `}
                />
                {phoneError && <p className="text-red-500 text-[13px] mt-2">{phoneError}</p>}
                <RequiredTextLabel text="Company Location?" req="nReq" />
                <TextInput placeHolder="" value={address} setFunction={setAddress} />
                <RequiredTextLabel text="Website Link?" req="nReq" />
                <TextInput placeHolder="" value={webLink} setFunction={setWebLink} />
            </div>
            <RequiredTextLabel text="Company Description?" req="nReq" />
            <div className="pb-20 mr-2 mt-5 xl:mr-64">
                <ReactQuill
                    className="h-60 text-addS"
                    value={compDescription}
                    onChange={(e) => setCompDescription(e)}
                    placeholder="Add Description"
                />
            </div>
            <div className='w-full flex mt-5 flex justify-between max-sm:flex-wrap gap-5'>
                <div className='w-full md:w-52'>
                    <SubmitButton loading={loading} buttonText="Save" />
                </div>
                <Link href="/users/employer/post" className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-black text-textW h-14'>
                    Post Job
                </Link>

            </div>
        </form>
    );
};
export default EmployerProfile