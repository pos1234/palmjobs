import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'
interface LeftImage {
    headline: string,
    text?: string,
    imageUrl?: string,
}
const RightImage = ({ headline, text, imageUrl }: LeftImage) => {
    return (
        <div className='flex  justify-between items-center max-md:flex-wrap mx-5 lg:mx-10 xl:mx-40'>
            <div className='md:w-1/2'>
                <p className='font-[700] text-[32px] py-10'>{headline}</p>
                <div className='font-[400] text-[14px] text-gray-500 leading-[24px] flex flex-col gap-7'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet  Sit id viverra enim ut hendrerit ultricies sed praesent. Et viverra ipsum auctor at eleifend. Integer integer rhoncus amet sagittis erat in facilisi diam est. Iaculis ut interdum mattis aliquet. Volutpat convallis aliquam nunc condimentum eget maecenas. At enim interdum est imperdiet nulla sit quam suspendisse. Fringilla neque vestibulum eu turpis imperdiet euismod leo nunc posuere. Venenatis nisl morbi ultrices diam auctor sociis id a. Auctor diam habitasse ultrices mattis quam nisi egestas habitant eros.
                    </p>
                    <p>
                        Varius mattis vestibulum enim mi amet elit amet in non. Orci mauris cursus rutrum adipiscing faucibus ultricies tristique nisi. Sit eu turpis magna amet. Leo nulla odio sit tellus est hendrerit. Id porttitor in integer nunc et eleifend accumsan. Quisque in sagittis semper condimentum ut cras aliquet diam.
                        Ornare ultricies amet est tortor eget. Non natoque dignissim est diam morbi.
                    </p>
                </div>
            </div>
            <div className='flex items-center pt-32 max-md:justify-center max-md:w-full'>
                <img src={imageUrl} alt="" className='w-[383px] h-[365px]' />
            </div>
        </div>
    )
}
const LeftImage = ({ headline, text, imageUrl }: LeftImage) => {
    return (
        <div className='flex  justify-between items-center max-md:flex-wrap mx-5 lg:mx-10 xl:mx-40'>
            <div className='flex items-center pt-32 max-md:w-full max-md:justify-center max-md:order-2'>
                <img src={imageUrl} alt="" className='w-[383px] h-[365px]' />
            </div>
            <div className='md:w-1/2'>
                <p className='font-[700] text-[32px] py-10'>{headline}</p>
                <div className='font-[400] text-[14px] text-gray-500 leading-[24px] flex flex-col gap-7'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet  Sit id viverra enim ut hendrerit ultricies sed praesent. Et viverra ipsum auctor at eleifend. Integer integer rhoncus amet sagittis erat in facilisi diam est. Iaculis ut interdum mattis aliquet. Volutpat convallis aliquam nunc condimentum eget maecenas. At enim interdum est imperdiet nulla sit quam suspendisse. Fringilla neque vestibulum eu turpis imperdiet euismod leo nunc posuere. Venenatis nisl morbi ultrices diam auctor sociis id a. Auctor diam habitasse ultrices mattis quam nisi egestas habitant eros.
                    </p>
                    <p>
                        Varius mattis vestibulum enim mi amet elit amet in non. Orci mauris cursus rutrum adipiscing faucibus ultricies tristique nisi. Sit eu turpis magna amet. Leo nulla odio sit tellus est hendrerit. Id porttitor in integer nunc et eleifend accumsan. Quisque in sagittis semper condimentum ut cras aliquet diam.
                        Ornare ultricies amet est tortor eget. Non natoque dignissim est diam morbi.
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
                <RightImage headline='About Palm Jobs' imageUrl={"/images/super-hero-on-duty-in-business-leader-concept-2194246-0 (1).svg"} />
                <div className='bg-[#FAFAFA]'>
                    <LeftImage headline='Our People' imageUrl={'/images/small-team-discussing-ideas-2194220-0.svg'} />
                </div>
                <RightImage headline='Our Leadership' imageUrl={'/images/people-discussing-about-online-payment-2194234-0 (1).svg'} />
                <div className='bg-[#FAFAFA]'>
                    <LeftImage headline='Our Leadership' imageUrl={'/images/problem-solving-2194252-0 (1).svg'} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About