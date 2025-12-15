import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
    return (
        <div>
           <div className='text-center my-10'><Link to='create-donation-request' className="btn btn-primary">Create Donation Request</Link></div>
        </div>
    );
};

export default Dashboard;