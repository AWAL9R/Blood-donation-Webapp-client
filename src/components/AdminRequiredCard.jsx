import React from 'react';

const AdminRequiredCard = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
                        ⛔
                    </div>
                    <h2 className="text-lg font-semibold text-red-700">
                        Access Denied
                    </h2>
                </div>

                <p className="mt-3 text-sm text-red-600">
                    You are not an <b>Administrator</b>. This page is restricted to admin users only.
                </p>

                <div className="mt-5 flex gap-3">
                    <button
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>

                    <a
                        href="/login"
                        className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                        Switch Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminRequiredCard;