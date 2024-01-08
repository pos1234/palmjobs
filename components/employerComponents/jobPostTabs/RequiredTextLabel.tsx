import AddIcon from '@mui/icons-material/Add';

export const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 font-medium leading-loose">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-lg font-medium leading-loose'}>*</span>
        </div>
    );
};
export const RequredExp = (props: any) => {
    const change = props.change
    const dataDistruct = props.dataDistruct
    return (
        <div
            onClick={(e) => props.setFuntioner({ ...dataDistruct, [change]: props.text })}
            className={`h-9 w-auto px-3 flex gap-x-2 items-center justify-center rounded-full ${props.value == props.text ? 'bg-gradientFirst text-textW' : 'cursor-pointer bg-textW text-gray-400 border-[1px] border-gray-200 hover:bg-gradientFirst hover:text-textW'}`}
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
export const RadioInput = (props: any) => {
    const change = props.change
    const dataDistruct = props.dataDistruct
    return (
        <div className="flex items-center gap-x-2">
            <input
                onChange={(e) => props.setFunction({ ...dataDistruct, [change]: e.currentTarget.value })}
                type="radio"
                checked={props.checked}
                value={props.radioValue}
                name={props.radioName}
                className="form-radio text-gradientFirst ring-green-500 cursor-pointer"
            />
            <span className="text-neutral-900 text-opacity-40 text-lg font-medium ">{props.radioText}</span>
        </div>
    );
};