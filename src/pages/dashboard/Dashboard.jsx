import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import BloodDonationRequests from '../BloodDonationRequests';



const Dashboard = () => {
    const { user } = useAuth()
    // const axiosSecure = useAxiosSecure()
    // const requests = useQuery({
    //     queryKey: ['my-donation-requests', user?.email, 'limit-3'], queryFn: async () => {
    //         const data = await axiosSecure.get('/my-donation-requests?limit=3')
    //         return data.data;
    //     }
    // })
    // console.log(requests);
    // return (
    //     <div>
    //        <div className='text-center my-10'><Link to='create-donation-request' className="btn btn-primary">Create Donation Request</Link></div>
    //     </div>
    // );
    

    return (
        <>
            <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral">
                            Welcome back, <span className="text-primary">{user.name}</span> 👋
                        </h2>
                        <p className="text-base-content/70 mt-2 max-w-xl">
                            Thank you for being a lifesaver. From here, you can manage your profile,
                            check donation eligibility, and respond to urgent blood requests.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <a href="/dashboard/profile" className="btn btn-outline btn-primary">
                            View Profile
                        </a>
                        <Link to='/dashboard/create-donation-request' className="btn btn-primary">Create Donation Request</Link>
                    </div>

                </div>
            </section>
            
            <BloodDonationRequests limit={3} title="My recent donation requests" route='my-donation-requests'  afterTable={<Link to='my-donation-requests' className='btn w-full'>View my all requests</Link>} hiddenIfNoData={true}></BloodDonationRequests>
        </>
    )

};

export default Dashboard;