import React from 'react';
import Marquee from 'react-fast-marquee';
import amazon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import star from '../../../assets/brands/star.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import start_people from '../../../assets/brands/start_people.png'
import randstad from '../../../assets/brands/randstad.png'



const ClientMarquee = () => {
    return (
        <div className='mx-16 mb-12'>
            <h2 className="text-2xl text-center mb-10 text-[#03373D] font-extrabold">We've helped thousands of sales teams</h2>
            <Marquee>
                <div className='flex items-center gap-12'>
                    <img className='' src={casio} alt="" />
                    <img src={amazon} alt="" />
                    <img src={moonstar} alt="" />
                    <img src={start_people} alt="" />
                     <img src={star} alt="" />
                    <img src={randstad} alt="" />
                </div>
            </Marquee>
        </div>
    );
};

export default ClientMarquee;