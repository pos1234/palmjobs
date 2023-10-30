import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DropDown from '@/components/DropDown';
import { useState } from 'react';
import Link from 'next/link';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';

const catagoryData = [{ name: 'Category' }, { name: 'Full Time' }, { name: 'Part Time' }, { name: 'Remote' }, { name: 'Internship' }];
const Home = () => {
    const router = useRouter();
    const [location, setLocation] = useState(false);
    const [category, setCategory] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const [catag, setCatag] = useState(catagoryData[0]);
    const openLocation = () => {
        setLocation(!location);
    };
    const openCategory = () => {
        setCategory(!category);
    };
    const handleSearch = () => {
        router.push({
            pathname: '/jobs',
            query: { param1: searchText, param2: address }
        });
    };
    return (
        <>
            <h1 className="text-red-500 font-bigW text-bigS leading-bigL">This is the jobs page</h1>
            <p>hey</p>
            {userData && (
                <div>
                    <h1>{userData.name}</h1>
                    <h1>{userData.email}</h1>
                </div>
            )}
            <table style={{ marginLeft: '15%', marginTop: '5%', width: '80vw' }} border={1}>
                <tbody>
                    {jobs &&
                        jobs.map((datas: PostedJob) => {
                            return (
                                <JobDetails
                                    userId={userData && userData.$id}
                                    companyName={datas.companyName}
                                    position={datas.jobTitle}
                                    location={datas.jobLocation}
                                    industry={datas.jobIndustry}
                                    gender={datas.prefferedGender}
                                    skills={datas.requiredSkills[0]}
                                    salary={datas.salaryRange}
                                    stat={datas.jobStatus}
                                    jobId={datas.$id}
                                    externalLink={datas.externalLink}
                                    key={datas.$id}
                                    employerId={datas.employerId}
                                />
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};
export default Home;
