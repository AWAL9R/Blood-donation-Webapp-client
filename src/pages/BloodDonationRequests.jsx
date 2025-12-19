import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { DonationRequestTable } from './dashboard/MyDonationRequests';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const BloodDonationRequests = ({ limit=10, title, afterTable = null, route = 'pending-donation-requests', hiddenIfNoData = false }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: [route, user?.email, limit, currentPage], queryFn: async () => {
            const data = await axiosSecure.get(`/${route}?${limit ? `limit=${limit}` : ''}&skip=${limit*currentPage}`)

            if (data?.data?.totalMatch) {
                setPages(Math.ceil(data?.data?.totalMatch / 10))
            }

            return data.data.data;
        }
    })


    return (
        <div>
            {requests.data ? ((hiddenIfNoData && requests.data?.length > 0) || (hiddenIfNoData == false && requests.data)) ?
                <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8 my-10">
                    <div className="overflow-x-auto">
                        <DonationRequestTable shouldFilter={route!="pending-donation-requests"} donations={requests.data} afterDelete={requests.refetch} title={title || "All Pending donation requests"}></DonationRequestTable>
                    </div>

                    {afterTable ? afterTable : <div className='flex justify-center my-3'>
                        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                    </div>}
                </section> : ""
                : <Loading></Loading>}
        </div>
    );
};

export default BloodDonationRequests;