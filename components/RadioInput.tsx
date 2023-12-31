const RadioInput = (props: any) => {
    return (
        <div className="flex items-center gap-x-2">
            <input
                onChange={(e) => props.setFunction(e.currentTarget.value)}
               type="radio"
                checked={props.checked}
                value={props.radioValue}
                name={props.radioName}
                className="form-radio text-gradientFirst ring-green-500 cursor-pointer"
            />
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium ">{props.radioText}</span>
        </div>
    );
};
export default RadioInput;
