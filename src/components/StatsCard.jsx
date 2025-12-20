import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PieChart } from 'react-minimal-pie-chart';

const statusColors = {
    pending: "#F39C12",     // Warm Orange/Amber
    "in-progress": "#3498DB", // Professional Blue
    done: "#27AE60",        // Success Green
    canceled: "#E74C3C"    // Soft Red
};

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
    let chartData = []
    if (requests?.data?.donationsByStatus) {
        Object.keys(requests?.data?.donationsByStatus).forEach(key => {
            const value = requests?.data?.donationsByStatus[key];
            const color = statusColors[key] || '#ff0000';
            const item = { title: key, value, color };
            chartData.push(item)
        })
    }
    // console.log(chartData);
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 p-10 ">
                <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="text-red-500 text-3xl mb-4">👤</div>
                    <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.donors || '-'}</h3>
                    <p className="text-gray-500 font-medium">Total Donors</p>
                </div>

                <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="text-green-500 text-3xl mb-4">💰</div>
                    <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.funding || '-'}$</h3>
                    <p className="text-gray-500 font-medium">Total Funding</p>
                </div>

                <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="text-blue-500 text-3xl mb-4">🩸</div>
                    <h3 className="text-3xl font-bold text-gray-800">{requests?.data?.donations || '-'}</h3>
                    <p className="text-gray-500 font-medium">Donation Requests</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-10 gap-3">
                <div className="text-center text-2xl mb-5 font-semibold">Donation Requests Chart</div>
                <div className="w-[70vw] lg:w-[50vw]">
                    <PieChart
                        data={chartData}

                    />

                </div>

                <div className="flex gap-4 flex-wrap">
                    <div className="flex gap-0.5 items-center">
                        <div className='h-3 w-3' style={{ backgroundColor: statusColors['pending'] }}></div> Pending
                    </div>
                    <div className="flex gap-0.5 items-center">
                        <div className='h-3 w-3' style={{ backgroundColor: statusColors['in-progress'] }}></div> In-progress
                    </div>
                    <div className="flex gap-0.5 items-center">
                        <div className='h-3 w-3' style={{ backgroundColor: statusColors['done'] }}></div> Done
                    </div>
                    <div className="flex gap-0.5 items-center">
                        <div className='h-3 w-3' style={{ backgroundColor: statusColors['canceled'] }}></div> Canceled
                    </div>
                </div>

            </div>

        </>
    );
};

export default StatsCard;