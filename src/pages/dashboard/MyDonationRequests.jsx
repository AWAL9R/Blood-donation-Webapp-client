import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { statusColor } from '../../settings';
import BloodDonationRequests from '../BloodDonationRequests';





const MyDonationRequests = () => {

    // const { user } = useAuth()
    // const axiosSecure = useAxiosSecure()
    // const requests = useQuery({
    //     queryKey: ['my-donation-requests', user?.email, 'limit-none'], queryFn: async () => {
    //         const data = await axiosSecure.get('/my-donation-requests?xlimit=3')
    //         return data.data;
    //     }
    // })


    // return (
    //     <div>
    //         {requests.data ?
    //             <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8 my-10">
    //                 <div className="overflow-x-auto">
    //                     <DonationRequestTable donations={requests.data} afterDelete={requests.refetch}></DonationRequestTable>
    //                 </div>
    //             </section>
    //             : <Loading></Loading>}
    //     </div>
    // );

    return <BloodDonationRequests title={"My donation requests"} route='my-donation-requests'></BloodDonationRequests>
};

export const DonationRequestTable = ({ donations, title = "My donation requests", afterDelete = () => { } }) => {

    const {user}=useAuth()

    const axiosSecure = useAxiosSecure()

    const handleDelete = (donation) => {
        Swal.fire({
            title: `Are you sure to delete donation request of receiver '${donation.receiver_name}'?`,
            showCancelButton: true,
            confirmButtonText: "Yes, DELETE",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axiosSecure.delete(`/donation/${donation._id}`)
                    if (!response.status == 200) {
                        const response_json = response.data;
                        return Swal.showValidationMessage(`
                      ${JSON.stringify(response_json.message)}
                    `);
                    }
                    return true;
                } catch (error) {
                    return Swal.showValidationMessage(`
                    Request failed: ${error}
                  `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Request of ${donation.receiver_name} is Deleted!`,
                });
                afterDelete(donation._id)
            }
        });
    }

    return (
        <table className="table table-zebra border border-gray-400 overflow-hidden">
            {/* head */}
            <thead>
                <tr>
                    <td className='bg-red-400 text-white text-2xl' colSpan={8}>{title}</td>
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
                {donations.map(item => <tr key={item._id}>
                    <td className='text-nowrap'>{item.receiver_name}</td>
                    <td className='text-nowrap'>{item.upazila}, {item.district}</td>
                    <td className='text-nowrap'>{item.donation_date}</td>
                    <td className='text-nowrap'>{item.donation_time}</td>
                    <td className='text-nowrap'>{item.bloodGroup}</td>
                    <td className='text-nowrap'><span className={`badge ${statusColor(item.status)}`}>{item.status}</span></td>
                    <td className='text-nowrap'>{item.donor_name ? `${item.donor_name}, ${item.donor_email}` : "N/A"}</td>
                    <td className='flex gap-1'>
                        {(user?.email==item.requester_email || user?.role=='admin') ? <><Link className="btn btn-info" to={`/edit/donation/${item._id}`}>Edit</Link>
                        <button className="btn btn-error" onClick={() => handleDelete(item)}>Delete</button></>:""}
                        <Link className="btn btn-success" to={`/donation/${item._id}`}>View</Link>
                    </td>
                </tr>)}

            </tbody>
        </table>
    )
}



export default MyDonationRequests;