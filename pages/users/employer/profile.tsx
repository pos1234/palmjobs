import Navigation from '@/components/employerComponents/Navigation'
import EmployerProfile from '@/components/employerComponents/Profile'
import { employeeAuth } from '@/components/withAuth'
import React, { useState } from 'react'

const Profile = () => {
    const [profilefilled, setProfileFilled] = useState(true)
    return (
        <div className="flex gap-x-3 max-md:flex-wrap bg-textW">
            <Navigation active='profile' />
            <EmployerProfile setFilled={setProfileFilled} />
        </div>)
}

export default employeeAuth(Profile)