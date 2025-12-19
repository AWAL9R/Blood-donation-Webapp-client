import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const FundingPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [funds, setFunds] = useState([
        // { id: 1, name: "Alice Johnson", amount: 500, createdAt: "2023-10-01" },
        // { id: 2, name: "Bob Smith", amount: 1200, createdAt: "2023-10-05" },
        // { id: 3, name: "Charlie Davis", amount: 750, createdAt: "2023-10-12" },
    ]);

    const requests = useQuery({
        queryKey: ["fundings", user?.email], queryFn: async () => {
            const data = await axiosSecure.get(`/fundings`)

            if (data?.data?.data) {
                setFunds(data.data.data)
            }
            return data.data.data;
        }
    })

    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleGiveFund = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const amount = e.target.amount.value;
        try {
            const result = await axiosSecure.post('/funding', { amount })
            if (result.data.url) {
                window.location.assign(result.data.url)
            } else {
                toast.error("Something went wrong.")
            }
        } catch (err) {
            toast.error(err.message)
        }

        setSubmitting(false)
        setShowForm(false);
        e.target.reset();
    };

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log(location);
        if (location.search.includes("success=true&id=")) {
            axiosSecure.post('/funding-success', { id: location.search.split("id=")[1].split("&")[0] })
                .then(res => {
                    if (res.data.success) {
                        // console.log(res.data);
                        requests.refetch()
                        navigate('/funding')
                    }
                })
                .catch(err => {
                    toast.error(err.message)
                })
        }
    })

    return (
        <div className="min-h-[70vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Funding</h1>
                        <p className="text-sm text-gray-500">Track and contribute to organization goals</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-sm ${showForm
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                    >
                        {showForm ? 'Cancel' : 'Give Fund'}
                    </button>
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 transition-all">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Make a Donation</h3>
                        <form onSubmit={handleGiveFund} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Donor Name</label>
                                <input
                                    type="text"
                                    value={user?.name || ""}
                                    disabled
                                    className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Amount ($)</label>
                                <input
                                    name="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-600 disabled:bg-gray-500 text-white p-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                                >
                                    Submit Funding
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Donor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {funds.map((fund) => (
                                    <tr key={fund._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{fund.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                                ${fund.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {fund.createdAt}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {funds.length === 0 && (
                        <div className="p-8 text-center text-gray-400">
                            No funding records found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FundingPage;