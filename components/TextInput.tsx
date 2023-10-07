const TextInput = (props: any) => {
    return (
        <>
            <input
                placeholder={props.placeHolder}
                value={props.value}
                onChange={(e) => props.setFunction(e.currentTarget.value)}
                className={
                    props.errorMessage
                        ? ` ${'h-12 pl-5 bg-white rounded-3xl border border-red-500 focus:ring-orange-500 focus:border-0 w-full '} ${
                              !props.class && 'md:w-96'
                          }`
                        : ` ${'h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:ring-orange-500 focus:border-0 w-full'} ${
                              !props.class && 'md:w-96'
                          }`
                }
            />
            {props.errorMessage && <p className="text-red-500 text-[13px] mt-2">{props.errorMessage}</p>}
        </>
    );
};
export default TextInput;
