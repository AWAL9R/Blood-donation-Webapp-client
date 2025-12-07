import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Banner = () => {
    const { user } = useAuth()
    return (
        <div>

            <section className="relative bg-linear-to-tr from-red-300 to-blue-200 text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 md:py-15 lg:py-23 text-center">

                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Donate Blood, Save Lives
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Join BloodLink today and become a hero for someone in need.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        {user == null && <a href="/signup"
                            className="px-8 py-4 rounded-xl bg-white text-red-700 font-semibold hover:bg-gray-100 transition">
                            Join as a Donor
                        </a>}


                        <a href="/search"
                            className="px-8 py-4 rounded-xl border border-white font-semibold hover:bg-white hover:text-red-700 transition">
                            Search Donors
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Banner;