import React from 'react';
import { signOut } from '@/lib/services';
const Navigation = () => {
    return (
        <button type="button" onClick={signOut}>
            logout
        </button>
    );
};

export default Navigation;
