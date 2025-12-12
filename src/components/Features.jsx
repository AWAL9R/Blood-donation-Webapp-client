import React from 'react';

const Features = () => {
    const items = [
        { title: "Smart Donor Match", desc: "Find donors by blood group & location.", icon: "❤️" },
        { title: "Live Availability", desc: "See who’s active and ready now.", icon: "📍" },
        { title: "Secure Contact", desc: "Message or call without sharing info.", icon: "🔒" },
        { title: "Verified Community", desc: "Only trusted, verified donors.", icon: "✔️" },
    ];

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Why BloodLink?</h2>
                <div className="grid gap-6 md:grid-cols-4">
                    {items.map((f, i) => (
                        <div key={i} className="card bg-base-200 shadow-xl p-6 text-center">
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h3 className="font-bold text-lg">{f.title}</h3>
                            <p className="text-sm opacity-80 mt-1">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;