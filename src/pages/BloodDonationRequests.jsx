import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { DonationRequestTable } from './dashboard/MyDonationRequests';
import Loading from '../components/Loading';

const BloodDonationRequests = ({limit, title, afterTable='', route='pending-donation-requests', hiddenIfNoData=false}) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: [route, user?.email, limit], queryFn: async () => {
            const data = await axiosSecure.get(`/${route}?${limit?`limit=${limit}`:''}`)
            return data.data;
        }
    })


    return (
        <div>
            {requests.data? ((hiddenIfNoData && requests.data?.length>0) || (hiddenIfNoData==false && requests.data)) ?
                <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8 my-10">
                    <div className="overflow-x-auto">
                        <DonationRequestTable donations={requests.data} afterDelete={requests.refetch} title={title||"All Pending donation requests"}></DonationRequestTable>
                    </div>
                    {afterTable}
                </section> :""
                : <Loading></Loading>}
        </div>
    );
};

export default BloodDonationRequests;