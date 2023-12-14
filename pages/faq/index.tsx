import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react'
interface Drop {
    title: string,
    detail: string,
    last: boolean
}
const DropItem = ({ title, detail, last }: Drop) => {
    const [toggle, setToggle] = useState(false)
    return <div onClick={() => setToggle(!toggle)} className={`flex-wrap flex cursor-pointer gap-5 pb-5 ${last ? '' : 'border-b-[1px]'}`}>
        <div className='w-full flex justify-between'>
            <p className='text-md'>
                {title}
            </p>
            <KeyboardArrowDownIcon />
        </div>
        <div className={toggle ? '' : 'hidden'}>
            <p className='text-[14px ]'>{detail}</p>
        </div>
    </div>
}
const FAQ = () => {
    return (
        <div>
            <Navigation />
            <div className='flex max-sm:flex-col px-5 xl:px-40 md:mt-20 py-5'>
                <div className='sm:w-1/2 flex justify-center py-10'>
                    <p className='font-bold text-2xl'>
                        Your questions, answered.
                    </p>
                </div>
                <div className='sm:w-1/2 flex flex-col gap-7'>
                    <DropItem last={false} title='How Can I Find Jobs That Match My Skills?'
                        detail="Simply use our search bar and filters to find jobs tailored to your skills. Adding specific skills helps align your profile with employers' requirements." />
                    <DropItem last={false} title='How Do I Apply for Jobs Directly Through Palm Jobs?'
                        detail="First, ensure your profile is complete. For direct applications, use our 'Easy Apply' feature. For external links, follow the instructions provided, and for email applications, use the contact details listed." />
                    <DropItem last={false}
                        title='How Can I Keep Track of Jobs I’ve Applied To?'
                        detail='Log in to your profile to access and manage your applications, all in one convenient place.'
                    />
                    <DropItem last={false}
                        title='How Can I Make My Profile Stand Out to Employers?'
                        detail='Keep your resume current and ensure your profile on Palm Jobs is comprehensive to enhance your chances with potential employers.'
                    />
                    <DropItem last={false}
                        title='Can I Get Help With My Resume on Palm Jobs?'
                        detail='Yes, our resume crafting tool makes it easy to create an impressive resume.'
                    />
                    <DropItem last={false}
                        title='What Types of Jobs Can I Find on Palm Jobs?'
                        detail='We offer a diverse range of opportunities, from entry-level to senior positions, across various industries.'
                    />
                    <DropItem last={false}
                        title='How Do I Post a Job Vacancy on Palm Jobs?'
                        detail="Log into your account, select 'Post Job', and enter your vacancy details. Your job will go live once these steps are completed."
                    />
                    <DropItem last={false}
                        title='Can I Track the Status of My Job Postings?'
                        detail="Your dashboard provides a comprehensive overview of your job postings, including applicant numbers and status."
                    />
                    <DropItem last={false}
                        title='How Does Palm Jobs Ensure I Find the Right Candidates?'
                        detail="We use optimized job-candidate matching to ensure your postings reach candidates with the requisite skills and experience."
                    />
                    <DropItem last={false}
                        title='Is There Support for Managing Applications?'
                        detail="Our platform offers efficient tools for tracking and managing job applications."
                    />
                    <DropItem last={false}
                        title='How Can I Make My Company Profile Attractive to Job Seekers?'
                        detail="Craft an engaging profile that highlights your company's culture and values to draw in top talent."
                    />
                    <DropItem last={false}
                        title='What Are the Costs Involved in Posting a Job?'
                        detail="For detailed pricing, please refer to our ‘For Employers’ section or get in touch with us directly."
                    />
                    <DropItem last={false}
                        title='How Can I Ensure My Job Posting Reaches the Right Candidates?'
                        detail="By creating clear, detailed job descriptions, you can attract the right talent for your needs."
                    />
                    <DropItem last={false}
                        title='I Don’t Have a Job Description, What Should I Do?'
                        detail="Our JD generator can assist you in creating a comprehensive and effective job description."
                    />
                    <DropItem last={true}
                        title='I Don’t Have a Resume, Can Palm Jobs Help?'
                        detail="Certainly! Our resume crafting tool is designed to assist you in creating a standout resume effortlessly."
                    />

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FAQ 