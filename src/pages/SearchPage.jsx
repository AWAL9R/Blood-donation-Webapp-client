import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import { bloodGroups } from '../settings';
import { useLoaderData } from 'react-router';

const SearchPage = () => {
    const geoData = useLoaderData()
    const [bloodGroup, setBloodGroup] = useState("");
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");


    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const requests = useQuery({
        // enabled: false,
        queryKey: ["search-users", user?.email, "limit", currentPage, bloodGroup, division, district, upazila], queryFn: async () => {

            // const xdivision = geoData.divisions.find(dv => dv.id == division).name;
            const xdistrict = geoData.districts.find(dv => dv.id == district)?.name;
            // console.log("object");
            const xupazila = geoData.upazilas.find(dv => dv.id == upazila)?.name || '';

            if(xdistrict==null)return null;

            const data = await axiosSecure.get(`/search-users?skip=${10 * currentPage}&bloodGroup=${encodeURIComponent(bloodGroup)}&district=${encodeURIComponent(xdistrict)}&upazila=${encodeURIComponent(xupazila)}`)

            if (data?.data?.totalMatch) {
                setPages(Math.ceil(data?.data?.totalMatch / 10))
            }

            return data.data.data;
        }
    })


    // const setCurrentPageX = (d) => {
    //     setCurrentPage(d)
    //     requests.refetch()
    // }



    const onSearch = () => {
        requests.refetch()
    }

    return (
        <>
            <div className="max-w-3xl mx-auto px-3 mt-10">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">

                        <h2 className="text-lg md:text-xl font-semibold text-primary mb-4 text-center md:text-left">
                            Find Blood Donor
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <select
                                className="select select-bordered w-full"
                                value={bloodGroup}
                                onChange={e => setBloodGroup(e.target.value)}
                            >
                                <option value="">Blood Group</option>
                                {bloodGroups.map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered w-full"
                                value={division}
                                onChange={e => {
                                    setDivision(e.target.value);
                                    setDistrict("");
                                    setUpazila("");
                                }}
                            >
                                <option value="">Division</option>
                                {geoData.divisions.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered w-full"
                                disabled={!division}
                                value={district}
                                onChange={e => {
                                    setDistrict(e.target.value);
                                    setUpazila("");
                                }}
                            >
                                <option value="">District</option>
                                {geoData.districts
                                    .filter(d => d.division_id == division)
                                    .map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                            </select>

                            <select
                                className="select select-bordered w-full"
                                disabled={!district}
                                value={upazila}
                                onChange={e => setUpazila(e.target.value)}
                            >
                                <option value="">Upazila</option>
                                {geoData.upazilas
                                    .filter(u => u.district_id == district)
                                    .map(u => (
                                        <option key={u.id} value={u.id}>{u.name}</option>
                                    ))}
                            </select>
                        </div>

                        <button
                            className="btn btn-primary w-full mt-4"
                            disabled={!bloodGroup || !district}
                            onClick={() =>
                                onSearch({ bloodGroup, division, district, upazila })
                            }
                        >
                            🔍 Search
                        </button>

                    </div>
                </div>
            </div>
            <div>
                {requests.isLoading && <Loading></Loading>}
                {requests.data ?
                    <section className="bg-base-100 rounded-2xl shadow p-6 md:p-8 my-10">
                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                    <tr>
                                        <th className="px-6 py-4">User Details</th>
                                        <th className="px-6 py-4">Blood Group</th>
                                        <th className="px-6 py-4">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {requests.data.length > 0 ? (
                                        requests.data.map((user) => (
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
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                                No users found matching ""
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='flex justify-center my-3'>
                            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                        </div>
                    </section>
                    : ''}
            </div>
        </>
    );
};

export default SearchPage;