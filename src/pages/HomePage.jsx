import React from 'react';
import Banner from '../components/Banner';
import ContactUs from '../components/ContactUs';
import Features from '../components/Features';
import BloodDonationRequests from './BloodDonationRequests';
import { Link } from 'react-router';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            
            <Features></Features>

            <BloodDonationRequests title="Recent Donation Requests" limit={5} afterTable={<Link to='/blood-donation-requests' className='btn w-full'>View all requests</Link>}/>

            <ContactUs></ContactUs>
          
        </div>
    );
};

export default HomePage;