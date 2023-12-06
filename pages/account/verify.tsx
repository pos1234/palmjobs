import { verfiyAccount } from '@/backend/accountBackend';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageContext } from 'next/types';
import Slider from '@/components/Slider';
import Link from 'next/link';
interface myQueryParams {
    userId: string;
    secret: string;
}
interface MyPageProps {
    queryParams: myQueryParams;
}
export const getServerSideProps = async (context: NextPageContext) => {
    const { query } = context;
    const queryParams = {
        userId: query.userId,
        secret: query.secret
    };
    return {
        props: {
            queryParams
        }
    };
};
const ConfirmAccount = ({ queryParams }: MyPageProps) => {
    const userId = queryParams.userId;
    const secret = queryParams.secret;
    useEffect(() => {
        try {
            verfiyAccount(userId, secret);
        } catch (e) {
            console.log(e);
        }
    }, []);
    const logo = '/images/logo.svg';
    const emailVerfied = '/images/emailVerfied.svg';
    return (
        <div className="grid grid-cols-12 overflow-y-auto  sm:pb-5 h-screen">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex items-center bg-skillColor rounded-tr-[5.75rem] rounded-br-[5.75rem] ">
                <div className="loginCoursel w-full  lg:pt-[15%] flex item-center justify-center md:h-[45%] lg:h-[75%] xl:h-[80%]">
                    <Slider />
                </div>
            </div>
            <div className="col-span-12 order-1 md:order-2 text-center flex flex-col gap-y-5 items-center max-lg:mb-5 md:col-span-6 employerBack">
                <div className="flex flex-col w-full items-center gap-y-3 mt-20 sm:mt-28">
                    <Link href="/">
                        <img src={logo} className=" w-[15rem]" />
                    </Link>
                    <div className="text-center text-zinc-900 text-2xl font-bold leading-10">Email Verified</div>
                    <img src={emailVerfied} className="w-[20rem]" />
                    <Link
                        href="/account/"
                        className="flex w-full  items-center justify-center  text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 lg:w-3/5 rounded-full"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ConfirmAccount;
