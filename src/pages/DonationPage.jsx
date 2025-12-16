import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import { statusColor } from '../settings';
import DataNotFoundCard from '../components/DataNotFoundCard';

const DonationPage = ({ onAccept, onBack }) => {
    const { id } = useParams()


    // const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: ['donation', id], queryFn: async () => {
            const data = await axiosSecure.get(`/donation/${id}`)
            return data.data;
        }
    })

    if (requests.data?.success==true && !requests.data?.data ) {
        return <DataNotFoundCard/>
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

    return (
        <section className="max-w-5xl mx-auto p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body gap-6">

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
                        <button onClick={onBack} className="btn btn-outline">
                            Back
                        </button>
                        <button onClick={() => onAccept?.(requests.data)} className="btn btn-primary">
                            Donate (Accept Request)
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

const Info=({ label, value })=> {
    return (
        <div>
            <p className="text-sm text-base-content/60">{label}</p>
            <p className="font-medium">{value || "-s"}</p>
        </div>
    );
}

export default DonationPage;