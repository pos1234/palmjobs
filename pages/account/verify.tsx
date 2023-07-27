import { verfiyAccount } from '@/lib/services';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageContext } from 'next/types';
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
        userId: query.userId as string,
        secret: query.secret as string
    };
    return {
        props: {
            queryParams
        }
    };
};
const ConfirmAccount = ({ queryParams }: MyPageProps) => {
    const userId = queryParams.userId.toString();
    const secret = queryParams.secret.toString();
    useEffect(() => {
        verfiyAccount(userId, secret).then((res) => console.log(res));
    }, []);
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>ACCOUNT VERIFIED</h1>
        </>
    );
};
export default ConfirmAccount;
