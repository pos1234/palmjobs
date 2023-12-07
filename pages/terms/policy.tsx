import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

const Policy = () => {
    return (
        <div>
            <Navigation />
            <div className='p-10 xl:px-40 flex flex-col gap-5 leading-7'>
                <p className='font-bold text-2xl'>Introduction</p>
                <p>
                    Welcome to Palm Jobs! We are committed to protecting and respecting your privacy. This Privacy Policy explains how we
                    collect, use, and safeguard the personal and non-personal data of our users. Whether you are a job seeker looking for new
                    opportunities or an employer searching for the perfect candidate, your trust is fundamental to our service. We take this
                    responsibility seriously and are dedicated to maintaining high standards of data protection and confidentiality.
                </p>
                <p> Who is Responsible for Your Information</p>
                <p>
                    Palm Jobs is the primary controller of the data you provide. We take responsibility for the security and processing of your
                    personal information, ensuring that it is handled in compliance with data protection laws and ethical standards. We
                    oversee the collection, use, and sharing of your data, providing you with transparency and control. Whether you're applying
                    for jobs, posting job listings, or interacting with our platform, we ensure that your data is managed responsibly and with
                    respect.
                </p>
                <p className='font-bold text-2xl'> Important Definitions </p>
                <ul>
                    <li>
                        ● Job Seeker: Individuals using Palm Jobs to find employment opportunities. We respect your journey and handle
                        your data – from resumes to application histories – with care.
                    </li>
                    <li>
                        ● Employer: Businesses or individuals using Palm Jobs for recruitment. We understand the importance of handling
                        your information, such as job listings and candidate interactions, securely.
                    </li>
                    <li>
                        ● Personal Data: This encompasses any information that identifies you directly or indirectly. Our platform uses this
                        data to personalize and enhance your experience.
                    </li>
                    <li>
                        ● Non-Personal Data: General information that doesn’t directly identify users but helps us improve our platform's
                        functionality and user experience.
                    </li>
                </ul>
                <p className='font-bold text-2xl'>Scope of Privacy Policy</p>
                <p>
                    Our Privacy Policy governs the data collected through our online platform, including personal details, job preferences, and
                    interaction histories. This policy is designed for users above 16 years old, in line with international data protection
                    standards. Users from different regions should be aware that additional local legal requirements may also apply. We
                    respect regional legal nuances and tailor our data practices accordingly.</p>
                <p className='font-bold text-2xl'> Data Collection and Use </p>
                <p>
                    We gather a variety of data to operate effectively and provide you with personalized services. This includes but is not
                    limited to account information, job preferences, application histories, and communication records. We use this data to
                    match job seekers with suitable opportunities and help employers find qualified candidates. Our aim is to facilitate a
                    smooth, efficient, and secure job-search process for all users.</p>
                <p className='font-bold text-2xl'> Legal Basis for Processing </p>
                <p> Our processing of your data is grounded in legal compliance, contractual necessities, and our legitimate interest in
                    offering a secure, efficient job search and recruitment platform. We ensure that our data practices adhere to legal
                    standards and reflect our commitment to your privacy.</p>
                <p className='font-bold text-2xl'> Data Sharing </p>
                <p>
                    In certain circumstances, we share your data with third parties and affiliates to enhance our services. This includes
                    sharing with service providers who assist us in operating the platform and with partners who help us in delivering tailored
                    job recommendations. We ensure these parties respect and protect your data as we do.
                </p>
                <p className='font-bold text-2xl'> Retention and Security </p>
                <p>
                    We retain your data only for as long as it is necessary for the purposes for which it was collected, in compliance with our
                    legal obligations. We take significant measures to protect your data against unauthorized access, alteration, disclosure, or
                    destruction. Our security protocols are regularly reviewed and updated to safeguard your information effectively.
                </p>
                <p className='font-bold text-2xl'> User Rights </p>
                <p>
                    As a valued user of Palm Jobs, you have several key rights regarding your personal data, reflecting our commitment to
                    your privacy and control over your information:
                </p>
                <ul>
                    <li>
                        ● Access Your Data: You have the right to request an overview of the personal data we hold about you.
                    </li>
                    <li>
                        ● Correct Your Information: If you find any of your data with us to be inaccurate or incomplete, you can request that
                        we make the necessary corrections.
                    </li>
                    <li>
                        ● Delete Your Data: You can ask for the deletion of your personal data from our systems.
                    </li>
                </ul>
                <p>
                    We strive to make these rights easily exercisable, ensuring your continued control over your personal information.
                </p>

                <p className='font-bold text-2xl'> Updates and Contact </p>
                <p>
                    Our Privacy Policy may evolve over time to reflect changes in our practices or legal requirements. We are committed to
                    keeping you informed of any significant updates. We'll notify you through the email address associated with your account
                    or by other means provided on our platform.
                </p>
                <p>
                    For any privacy concerns, inquiries, or to exercise your data rights, please contact our dedicated privacy team at
                    privacy@palmjobs.et. We value your privacy and are here to assist you with any questions or requests you may have.
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Policy