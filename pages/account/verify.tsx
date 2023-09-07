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
        userId: query.userId,
        secret: query.secret
    };
    return {
        props: {
            queryParams
        }
    };
}; 
const ConfirmAccount = ( { queryParams }: MyPageProps ) => {
     const userId = queryParams.userId;
    const secret = queryParams.secret; 
    console.log(secret);
    useEffect(() => {
        console.log(typeof secret);

        try {
            verfiyAccount(userId, secret);
        } catch (e) {
            console.log(e);
        }
    }, []);
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>ACCOUNT VERIFIED</h1>
        </>
    );
};
export default ConfirmAccount;
