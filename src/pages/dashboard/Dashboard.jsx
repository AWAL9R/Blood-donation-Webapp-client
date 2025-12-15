import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Dashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: ['my-donation-requests', user.email], queryFn: async () => {
            const data = await axiosSecure.get('/my-donation-requests?limit=3')
            return data.data;
        }
    })
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
                        <a href="/profile" className="btn btn-outline btn-primary">
                            View Profile
                        </a>
                        <a href="/requests" className="btn btn-primary">
                            View Requests
                        </a>
                    </div>

                </div>
            </section>
            {requests.data && <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8 my-10">
                <div className="overflow-x-auto">
                    <table className="table table-zebra border border-gray-400">
                        {/* head */}
                        <thead>
                            <tr>
                                <td className='bg-red-400 text-white text-2xl' colSpan={8}>My donation requests</td>
                            </tr>
                            <tr>
                                <th>Receiver</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th>Donor Information</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {requests.data.map(item => <tr key={item._id}>
                                <td>{item.receiver_name}</td>
                                <td>{item.upazila}, {item.district}</td>
                                <td>{item.donation_date}</td>
                                <td>{item.donation_time}</td>
                                <td>{item.bloodGroup}</td>
                                <td>{item.status}</td>
                                <td>{item.donor_name?`${item.donor_name}, ${item.donor_email}`:"N/A"}</td>
                                <td>Actions</td>
                            </tr>)}

                        </tbody>
                    </table>
                    <Link to='my-donation-requests' className='btn w-full'>View my all requests</Link>
                </div>
            </section>}
        </>
    )

};

export default Dashboard;