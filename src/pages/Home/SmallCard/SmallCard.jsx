import React from 'react';
import { motion } from 'framer-motion';
import bokingIcon from '../../../assets/bookingIcon.png';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: 'easeOut'
        }
    })
};

const SmallCard = () => {
    return (
        <div className="xl:mx-32 lg:mx-20 md:mx-12 mx-4 my-16">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold mb-10 text-center md:text-left"
            >
                How it Works
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.03 }}
                        className="p-6 space-y-4 rounded-2xl bg-gray-200 text-black 
                                   transition-shadow duration-300 hover:shadow-xl"
                    >
                        <img
                            src={bokingIcon}
                            alt="booking"
                            className="w-14 h-14"
                        />
                        <h2 className="text-lg md:text-xl font-bold">
                            Booking Pick & Drop
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            From personal packages to business shipments — we deliver on time, every time.
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SmallCard;
