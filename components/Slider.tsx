import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const Slider = () => {
    const profile = '/images/profile.svg';
    const renderCustomIndicator = (
        clickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
        isSelected: boolean,
        index: number,
        label: string
    ): React.ReactNode => {
        return (
            <div style={{ display: 'inline-block' }} className="float-left">
                <span
                    key={index}
                    onClick={clickHandler}
                    onKeyDown={clickHandler}
                    className={
                        isSelected
                            ? 'w-5 h-5 bg-gradient-to-r from-gradientFirst to-gradientSecond cursor-pointer rounded-full'
                            : 'w-5 h-5 bg-textW rounded-full cursor-pointer'
                    }
                    style={{ display: 'inline-block', marginRight: '1rem' }}
                />
            </div>
        );
    };
    return (
        <Carousel
            renderIndicator={renderCustomIndicator}
            showStatus={false}
            showArrows={false}
            autoPlay={true}
            interval={9000}
            showThumbs={false}
            className="flex flex-col pt-10 px-20 max-md:mb-10 md:px-20 lg:px-32"
        >
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 text-lg pb-5 font-medium max-h-18 overflow-hidden md:text-base lg:text-lg xl:text-xl leading-7">
                    “It’s not huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs at YES are
                    low, which means the client pays less and I earn more.”
                </p>
                <div className="grid grid-cols-12">
                    <img src={profile} className="w-full h-full col-span-2" />
                    <div className="col-span-10 flex flex-col justify-center pl-5">
                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                    </div>
                </div>
            </div>
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 text-lg pb-5 font-medium max-h-18 overflow-hidden md:text-base lg:text-lg xl:text-xl leading-7">
                    “It’s not huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs at YES are
                    low, which means the client pays less and I earn more.”
                </p>
                <div className="grid grid-cols-12">
                    <img src={profile} className="w-full h-full col-span-2" />
                    <div className="col-span-10 flex flex-col justify-center pl-5">
                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                    </div>
                </div>
            </div>
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 text-lg pb-5 font-medium max-h-18 overflow-hidden md:text-base lg:text-lg xl:text-xl leading-7">
                    “It’s not huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs at YES are
                    low, which means the client pays less and I earn more.”
                </p>
                <div className="grid grid-cols-12">
                    <img src={profile} className="w-full h-full col-span-2" />
                    <div className="col-span-10 flex flex-col justify-center pl-5">
                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default Slider;
