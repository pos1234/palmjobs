import { getAccount, getRole, signOut } from '@/lib/services';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
export function candidateAuth(WrappedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const router = useRouter();
        const checkAuth = async () => {
            const loggedIn = await getAccount();

            if (loggedIn !== 'failed') {
                const role = await getRole(loggedIn.$id);
                if (role.documents[0].userRole !== 'candidate') {
                    signOut();
                    router.push('/account');
                }
            }
            // Check if user is authenticated
            if (loggedIn == 'failed') {
                console.log('not successfull');
                router.push('/account');
            }
        };
        checkAuth();
        return <WrappedComponent {...props} />;
    };
}
export function employeeAuth(WrappedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const router = useRouter();
        const checkAuth = async () => {
            const loggedIn = await getAccount();
            if (loggedIn !== 'failed') {
                const role = await getRole(loggedIn.$id);
                if (role.documents[0].userRole !== 'employer') {
                    signOut();
                    router.push('/account');
                }
            }
            // Check if user is authenticated
            if (loggedIn == 'failed') {
                console.log('not successfull');
                router.push('/account');
            }
        };

        checkAuth();

        return <WrappedComponent {...props} />;
    };
}
