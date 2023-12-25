import ChangePassword from '@/components/ChangePassword';
import DeleteAccount from '@/components/DeleteAccount';
import ChooseEmail from '@/components/employerComponents/ChooseEmail';
import Navigation from '@/components/employerComponents/Navigation';
import { employeeAuth } from '@/components/withAuth';
const Privacy = () => {
    return <>
        <div className="flex max-md:flex-wrap bg-textW">
            <Navigation active='privacy' />
            <div className=" pt-5 px-3 pb-10 bg-textW w-full max-xl:flex-grow xl:w-2/3 min-h-screen">
                <ChangePassword class="pt-5 pb-10 flex max-sm:px-5 sm:pl-10 xl:pr-28 my-5 xl:px-20" />
                <ChooseEmail />
{/*                 <DeleteAccount />
 */}            </div>

        </div>
    </>;
};

export default employeeAuth(Privacy);
