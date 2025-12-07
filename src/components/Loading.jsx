import React from 'react';

const Loading = ({message="Loading....."}) => {
    return (
        <div className='min-h-[70vh] min-w-svw flex items-center justify-center'>
            <div className="text-primary xl:scale-400 lg:scale-300 md:scale-200 sm:scale-150">
                <span className="loading loading-spinner loading-xl"></span> <span className='text-xl'>{message}</span>
            </div>
            
        </div>
    );
};

export default Loading;