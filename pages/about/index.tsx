import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'
interface LeftImage {
    headline: string,
    firstText?: string,
    secondText?: string,
    imageUrl?: string,
}
const RightImage = ({ headline, secondText, firstText, imageUrl }: LeftImage) => {
    return (
        <div className='flex  justify-between items-center max-md:flex-wrap mx-5 lg:mx-10 xl:mx-40'>
            <div className='md:w-1/2'>
                <p className='font-[700] text-[32px] py-10'>{headline}</p>
                <div className='font-[400] text-[12px] text-gray-500 leading-[24px] flex flex-col gap-7'>
                    <p>
                        {firstText}
                    </p>
                    <p>
                        {secondText}
                    </p>
                </div>
            </div>
            <div className='flex items-center pt-32 max-md:justify-center max-md:w-full'>
                <img src={imageUrl} alt="" className='w-[383px] h-[365px]' />
            </div>
        </div>
    )
}
const LeftImage = ({ headline, secondText, firstText, imageUrl }: LeftImage) => {
    return (
        <div className='flex  justify-between items-center max-md:flex-wrap mx-5 lg:mx-10 xl:mx-40'>
            <div className='flex items-center pt-32 max-md:w-full max-md:justify-center max-md:order-2'>
                <img src={imageUrl} alt="" className='w-[383px] h-[365px]' />
            </div>
            <div className='md:w-1/2'>
                <p className='font-[700] text-[32px] py-10'>{headline}</p>
                <div className='font-[400] text-[12px] text-gray-500 leading-[24px] flex flex-col gap-7'>
                    <p>
                        {firstText}
                    </p>
                    <p>
                        {secondText}
                    </p>
                </div>
            </div>
        </div>
    )
}
const About = () => {
    return (
        <div>
            <Navigation />
            <div className='flex flex-col gap-10'>
                <RightImage headline='About Palm Jobs'
                    firstText="Welcome to Palm Jobs, where we redefine the Ethiopian job market. Our mission is simple yet profound: to be the bridge that effortlessly connects professionals with their dream jobs and employers with exceptional talent. At Palm Jobs, we're committed to addressing the core pain points of job seekers and employers in any labor market. We understand the challenges and intricacies of job hunting and talent acquisition, and we're here to simplify and streamline these processes. We're not just a job board; we're innovators and connectors. Through our user-centric platform, which is at the cutting edge of technology and continuously evolving, we empower job seekers and employers alike. Our goal is to make meaningful employment connections more seamless, efficient, and enjoyable than ever before."
                    secondText="Proudly owned and operated by YES, Palm Jobs benefits from years of operational experience and in-depth understanding of the labor market, gained by its parent organization. This extensive expertise gives us a unique edge in comprehending and catering to the specific needs of both job seekers and employers in Ethiopia. We provide a service that's not only localized but also enriched with global best practices and insights, ensuring that we meet the evolving demands of the Ethiopian job market"
                    imageUrl={"/images/super-hero-on-duty-in-business-leader-concept-2194246-0 (1).svg"} />
                <div className='bg-[#FAFAFA]'>
                    <LeftImage headline='Our People'
                        firstText='Meet the heart and soul of Palm Jobs – our dedicated team. We are a diverse group of professionals united by a shared vision: to foster a thriving job market in Ethiopia. Our team is the embodiment of our core values - integrity, innovation, and excellence. We bring to the table a rich blend of industry expertise, a passion for progress, and an unwavering commitment to delivering excellence. Every day, we work towards empowering job seekers and employers, driven by a desire to see every professional in Ethiopia reach their full potential.'
                        imageUrl={'/images/small-team-discussing-ideas-2194220-0.svg'} />
                </div>
                <RightImage
                    firstText='At Palm Jobs, our leadership team paves the way for a new era of job matching in Ethiopia. Guided by our vision of becoming the leading job board in the country, our leaders bring a unique mix of expertise, foresight, and dedication to excellence. They inspire innovation, drive progress, and ensure that every step we take is aligned with our mission of facilitating efficient and meaningful employment connections. Their strategic direction is not just about leading a company, but about transforming the labor market in Ethiopia.'
                    headline='Our Leadership' imageUrl={'/images/people-discussing-about-online-payment-2194234-0 (1).svg'} />
                <div className='bg-[#FAFAFA]'>
                    <LeftImage
                        firstText="At Palm Jobs, our commitment extends beyond merely connecting job seekers and employers. We're on a mission to create a future of work that is accessible, innovative, and empowering. As an emerging job site in Ethiopia, operated by YES, we are at the forefront of developing solutions that excel in ease, user experience, and technology. Our goal is to create a positive and tangible impact in society by linking individuals to meaningful work opportunities, thereby enriching lives and fostering personal and professional growth. We believe that by connecting people with the right opportunities, we can ignite a cycle of empowerment and progress that resonates throughout our community."
                        headline='Our Commitments' imageUrl={'/images/problem-solving-2194252-0 (1).svg'} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About