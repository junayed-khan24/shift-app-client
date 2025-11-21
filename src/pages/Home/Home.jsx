import React from 'react';
import Banner from './Banner/Banner';
import ServicesSection from './Services/ServicesSection';
import ClientMarquee from './ClientMarquee/ClientMarquee';
import BenefitsSection from './Benefits/BenefitsSection';
import BeMerchant from './BeMerchant/BeMerchant';
import FAQ from './faq/FAQ';
import Review from './clientReview/Review';
import SmallCard from './SmallCard/SmallCard';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SmallCard></SmallCard>
            <ServicesSection></ServicesSection>
            <ClientMarquee></ClientMarquee>
            <BenefitsSection></BenefitsSection>
            <BeMerchant></BeMerchant>
            <Review></Review>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;