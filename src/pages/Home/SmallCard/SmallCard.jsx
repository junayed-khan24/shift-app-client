import React from 'react';
import bokingIcon from '../../../assets/bookingIcon.png'

const SmallCard = () => {
    return (
        <div className='mx-32 my-12'>
            <h2 className="text-4xl font-extrabold mb-8">How it Works</h2>
            <div className='flex gap-6 '>
                <div className='p-6 space-y-3 rounded-2xl bg-gray-200 text-black'>
                    <img src={bokingIcon} alt="" />
                    <h2 className='text-xl font-bold'>Booking Pick & Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-6 space-y-3 rounded-2xl bg-gray-200 text-black'>
                    <img src={bokingIcon} alt="" />
                    <h2 className='text-xl font-bold'>Booking Pick & Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-6 space-y-3 rounded-2xl bg-gray-200 text-black'>
                    <img src={bokingIcon} alt="" />
                    <h2 className='text-xl font-bold'>Booking Pick & Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-6 space-y-3 rounded-2xl bg-gray-200 text-black'>
                    <img src={bokingIcon} alt="" />
                    <h2 className='text-xl font-bold'>Booking Pick & Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                
            
                
            
            </div>
        </div>
    );
};

export default SmallCard;