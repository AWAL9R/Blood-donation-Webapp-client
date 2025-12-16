import React from 'react';

const DataNotFoundCard = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center mx-4">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xl">
                    🔍
                </div>

                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                    Data Not Found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    The requested data does not exist or may have been removed.
                </p>

                <div className="mt-5 flex justify-center gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900"
                    >
                        Retry
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataNotFoundCard;