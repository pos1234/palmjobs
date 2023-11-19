import AddIcon from '@mui/icons-material/Add';

export const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium leading-loose'}>*</span>
        </div>
    );
};
export const RequredExp = (props: any) => {
    return (
        <div
            onClick={() => props.setFuntioner(props.text)}
            className={
                props.value == props.text
                    ? 'h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center rounded-3xl bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW'
                    : 'hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center bg-white rounded-3xl border border-gray-200'
            }
        >
            <AddIcon sx={{ fontSize: '1.3rem' }} />
            <p className="text-[0.9rem]"> {props.text}</p>
        </div>
    );
};
export const Jobtype = (props: any) => {
    return (
        <div className="col-span-6 flex flex-col max-md:pl-2 py-2 rounded-2xl gap-y-2 bg-textW sm:col-span-3 items-center">
            <p className="font-fhW sm:max-md:text-[0.8rem] md:text-fhS md:max-lg:text-[1rem]"> {props.salary}</p>
            <p className=" text-fadedText sm:max-md:text-[12px] flex md:max-lg:text-[0.7rem] lg:text-[14px]">
                {props.icon}
                {props.money}
            </p>
        </div>
    );
};