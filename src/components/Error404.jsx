import React from 'react';

const Error404 = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="min-h-[70vw] lg:min-h-[50vw] flex items-center justify-center">
                <div className=" text-center max-w-md px-6">
                    <h1 className="text-7xl font-extrabold text-slate-800">404</h1>
                    <p className="mt-3 text-lg font-semibold text-slate-700">
                        Page Not Found
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        The page you’re looking for doesn’t exist or was moved.
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                        <a
                            href="/"
                            className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900"
                        >
                            Go Home
                        </a>
                        <button
                            onClick={() => window.history.back()}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error404;