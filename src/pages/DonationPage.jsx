import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import { statusColor } from '../settings';
import DataNotFoundCard from '../components/DataNotFoundCard';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const DonationPage = () => {
    const { id } = useParams()

    const { user } = useAuth()

    const navigate = useNavigate()

    const modalRef = useRef(null)


    // const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: ['donation', id], queryFn: async () => {
            const data = await axiosSecure.get(`/donation/${id}`)
            return data.data;
        }
    })

    if (requests.data?.success == true && !requests.data?.data) {
        return <DataNotFoundCard />
    }

    if (!requests.data) {
        return <Loading />
    }


    const {
        requester_name,
        requester_email,
        receiver_name,
        bloodGroup,
        division,
        district,
        upazila,
        hospital_name,
        full_address,
        donation_date,
        donation_time,
        request_message,
        status
    } = requests.data.data;

    const handleAccept = async (donation) => {
        modalRef.current?.close()
        try {
            const response = await axiosSecure.patch(`/donation-accept/${donation._id}`)
            // console.log(response);
            if (!response.status == 200) {
                const response_json = response.data;
                return Swal.showValidationMessage(`
                          ${JSON.stringify(response_json.message)}
                        `);
            }
            Swal.fire({
                title: `Request of ${donation.receiver_name}'s is accepted!`,
            });
            requests.refetch()
        } catch (error) {
            // console.log(error);
            return Swal.fire(`
                        Request failed: ${error.message}
                      `);
        }
    }

    const showModal = () => {
        modalRef.current?.showModal()
    }



    return (
        <section className="max-w-5xl mx-auto p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body gap-6">

                    {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Accept this Donation!</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleAccept(requests.data.data) }}>
                                <p className="py-4 text-lg flex gap-1 items-center">
                                    Donor Name:
                                    <input type="text" className='input' value={user?.name} disabled={true} />
                                </p>
                                <p className="py-4 text-lg flex gap-1 items-center">
                                    Donor Email:
                                    <input type="text" className='input' value={user?.email} disabled={true} />
                                </p>
                                <button className="btn btn-primary">Accept this request</button>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            Donation Request Details
                        </h1>
                        <div className='flex flex-col gap-1'>
                            <span className="badge badge-error badge-lg">
                                Blood Group: {bloodGroup}
                            </span>
                            <span className={`badge ${statusColor(status)} badge-lg`}>
                                Status: {status}
                            </span>
                        </div>
                    </div>

                    {/* Names */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-base-content/60">Requester</p>
                            <p className="font-semibold">{requester_name}</p>
                            <p className="text-sm text-base-content/70">{requester_email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-base-content/60">Receiver</p>
                            <p className="font-semibold">{receiver_name}</p>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* Location */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {[["Division", division], ["District", district], ["Upazila", upazila]].map(
                            ([label, value]) => (
                                <div key={label}>
                                    <p className="text-sm text-base-content/60">{label}</p>
                                    <p className="font-medium">{value}</p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Hospital */}
                    <div>
                        <p className="text-sm text-base-content/60">Hospital</p>
                        <p className="font-medium">{hospital_name}</p>
                        <p className="text-sm text-base-content/70">{full_address}</p>
                    </div>

                    <div className="divider" />

                    {/* Date & Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <Info label="Donation Date" value={donation_date} />
                        <Info label="Donation Time" value={donation_time} />
                    </div>

                    {/* Message */}
                    <div>
                        <p className="text-sm text-base-content/60">Request Message</p>
                        <p className="mt-1 p-4 rounded-xl bg-base-200">
                            {request_message || "-"}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="card-actions justify-end gap-3">
                        <button onClick={() => navigate(-1)} className="btn btn-outline">
                            Back
                        </button>
                        {
                            status == 'pending' ? <button onClick={() => showModal()} className="btn btn-primary">
                                Donate (Accept Request)
                            </button> : ""
                        }
                    </div>

                </div>
            </div>
        </section>
    );
}

const Info = ({ label, value }) => {
    return (
        <div>
            <p className="text-sm text-base-content/60">{label}</p>
            <p className="font-medium">{value || "-s"}</p>
        </div>
    );
}

export default DonationPage;