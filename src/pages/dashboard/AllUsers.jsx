import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        queryKey: ['users', user?.email, "limit"], queryFn: async () => {
            const data = await axiosSecure.get(`/users?`)
            return data.data;
        }
    })

    const [filterStatus, setFilterStatus] = useState('all');

    // Destructure status and data from the query object
    const { data, isLoading, isError } = requests;
    const users = data?.data || [];

    // Filter logic
    const filteredUsers = filterStatus === 'all'
        ? users
        : users.filter(user => user.status === filterStatus);

    const blockUser = (user, isBlock = true) => {
        axiosSecure.post(`/edit-user/${user._id}`, { setStatus: isBlock ? "blocked" : "active" })
            .then(res => {
                if (res.data.success) {
                    toast.success(`${isBlock ? "Blocking" : "Unblocking"} ${user.name} Success`)
                } else {
                    toast.error(`${isBlock ? "Blocking" : "Unblocking"} ${user.name} Failed`)
                }
                requests.refetch()
            })
            .catch(err => {
                toast.error(err.message)
                requests.refetch()
            })
    }

    const promoteUser = (user, role = 'donor') => {
        axiosSecure.post(`/edit-user/${user._id}`, { setRole: role })
            .then(res => {
                if (res.data.success) {
                    toast.success(`Making ${user.name} as ${role} Success`)
                } else {
                    toast.error(`Making ${user.name} as ${role} Failed`)
                }
                requests.refetch()
            })
            .catch(err => {
                toast.error(err.message)
                requests.refetch()
            })
    }

    const askConfirmation = (next, user, action, actionMessage) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are going to ${actionMessage}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                next(user, action);
            }
        });
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500 text-center py-10">Error loading users...</div>;
    }

    return (
        <div className="space-y-4">
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-800">User Directory</h2>
                <select
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Blood Group</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user._id || user.email} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                            src={user.photo || 'https://via.placeholder.com/40'}
                                            alt={user.name}
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-gray-500 text-xs">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            {user.bloodGroup}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 italic">
                                        {user.upazila}, {user.district}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 uppercase tracking-wider text-xs font-bold flex gap-0.5">
                                        {user.status == 'active' && user.role != 'admin' && <button className='btn btn-error' onClick={() => askConfirmation(blockUser, user, true, `block ${user.name}`)}>Block</button>}
                                        {user.status == 'blocked' && <button className='btn btn-success' onClick={() => askConfirmation(blockUser, user, false, `unblock ${user.name}`)}>Unblock</button>}
                                        {user.role != 'admin' && user.role != 'donor' && <button className='btn btn-success' onClick={() => askConfirmation(promoteUser, user, 'donor', `make donor ${user.name}`)}>Make Donor</button>}
                                        {user.role != 'admin' && user.role != 'volunteer' && <button className='btn btn-success' onClick={() => askConfirmation(promoteUser, user, 'volunteer', `make volunteer ${user.name}`)}>Make Volunteer</button>}
                                        {user.role != 'admin' && user.role != 'admin' && <button className='btn btn-success' onClick={() => askConfirmation(promoteUser, user, 'admin', `make admin ${user.name}`)}>Make Admin</button>}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                    No users found matching "{filterStatus}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;