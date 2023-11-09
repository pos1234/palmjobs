const Dashboard = (props: any) => {
    const analytics = '/images/dashboardImage.jpg';
    return (
        <div className="bg-textW flex flex-col items-center justify-center gap-y-4 pt-20">
            <img src={analytics} className=" w-96 h-96" />
             <p className='text-[3rem] font-[500]'>Coming Soon !!!</p>
        </div>
    );
};
export default Dashboard;
