import CancelIcon from '@mui/icons-material/Cancel';
const TextInput = (props: any) => {
    return (
        <>
            <input
                placeholder={props.placeHolder}
                value={props.value}
                onChange={(e) => props.setFunction(e.currentTarget.value)}
                className={
                    props.errorMessage
                        ? ` ${'h-12 pl-5 bg-white rounded-xl border border-red-500 focus:ring-gradientFirst focus:border-0 w-full '} ${!props.class && 'md:w-96'
                        }`
                        : ` ${'h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientSecond focus:border-0 w-full'} ${!props.class && 'md:w-96'
                        }`
                }
            />
            {props.errorMessage && <p className="text-red-500 text-[13px] mt-2">{props.errorMessage}</p>}
        </>
    );
};
export const SubmitButton = (props: any) => {
    return (
        <button disabled={props.loading ? true : false} type="submit" className="bg-black w-full rounded-xl text-textW h-14">
            {props.loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>}
            {props.loading && <span>Loading...</span>}
            {!props.loading && props.buttonText}
        </button>

    )
}
export const DeleteConfirmation = (props: any) => {
    return (
        <div className="flex items-center gap-3">
            <div className='bg-[#FFDCE4] h-full flex items-center justify-center px-2 py-1 text-[#FF507A]'>
                <CancelIcon />
            </div>
            <div className='flex flex-wrap justify-between flex-grow'>
                <p className='text-sm'>Are you Sure you want to delete?</p>
                <div className='flex gap-4 text-md'>
                    <p onClick={() => {
                        props.deleteItem(props.index);
                        props.setConfirmDelete(false);
                    }} className='cursor-pointer text-[#FF507A]'>Yes</p>
                    <p onClick={() => props.setConfirmDelete(false)} className='text-gradientFirst cursor-pointer'>No</p>
                </div>
            </div>
        </div>)
}
interface List {
    icon: any,
    items: string
}
export const SmallLists = ({ icon, items }: List) => {
    return <li className="inline bg-[#FAFAFA] flex items-center gap-1 text-xs text-gradientFirst rounded-[4px] p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:h-[28px]">
        {icon}
        <span className='text-[#20262E]'>{items}</span>
    </li>
}
export default TextInput;
