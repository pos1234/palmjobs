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
            className="flex flex-col justify-center px-5 max-md:mb-10 sm:px-20 md:px-20 lg:px-32 overflow-hidden"
        >
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 pb-5 font-medium max-h-18 overflow-hidden text-xl sm:text-2xl xl:text-3xl leading-7">
                    Job searching shouldn't be a full-time job. With PalmJobs, it isn't.
                </p>
            </div>
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 pb-5 font-medium max-h-18 overflow-hidden text-xl sm:text-2xl xl:text-3xl leading-7">
                    Simplify your search; amplify your success.
                </p>
            </div>
            <div className="w-full text-left flex flex-col mb-20">
                <p className="text-zinc-900 pb-5 font-medium max-h-18 overflow-hidden text-xl sm:text-2xl xl:text-3xl leading-7">
                    Behind every thriving company is a team of dedicated professionals. Find yours on Palm Jobs.
                </p>
                
            </div>
        </Carousel>
    );
};

export default Slider;
