import { getAccount, signOut, getRole } from '@/backend/accountBackend';
import { useRouter } from 'next/dist/client/router';

export function candidateAuth(WrappedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const router = useRouter();
        const checkAuth = async () => {
            if (typeof window !== 'undefined') {
                import('localforage').then((localforage) => {
                    // Your client-side code here using localforage
                    localforage.getItem('userRole').then((value: any) => {
                        if (!value) {
                            typeof window !== 'undefined' && router.push('/account');
                        }
                        if (value !== 'candidate') {
                            signOut();
                            typeof window !== 'undefined' && router.push('/account');
                        }
                    })
                });
            }
        }
        /*             const loggedIn = await getAccount();
         */
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
                const role = await getRole();
                if (role && role.documents[0].userRole !== 'employer') {
                    signOut();
                    typeof window !== 'undefined' && router.push('/account');
                }
            }
            // Check if user is authenticated
            if (loggedIn == 'failed') {
                typeof window !== 'undefined' && router.push('/account');
            }
        };
        checkAuth();
        return <WrappedComponent {...props} />;
    };
}
