import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StatsCard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: ['stats', user?.email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/stats`)
            return data?.data;
        }
    })
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-10 ">
            <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-red-500 text-3xl mb-4">👤</div>
                <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.donors||'-'}</h3>
                <p className="text-gray-500 font-medium">Total Donors</p>
            </div>

            <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-green-500 text-3xl mb-4">💰</div>
                <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.funding||'-'}</h3>
                <p className="text-gray-500 font-medium">Total Funding</p>
            </div>

            <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-blue-500 text-3xl mb-4">🩸</div>
                <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.donations||'-'}</h3>
                <p className="text-gray-500 font-medium">Donation Requests</p>
            </div>
        </div>
    );
};

export default StatsCard;