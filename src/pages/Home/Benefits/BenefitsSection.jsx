

import BenefitCard from "./BenefitCard";
import live from '../../../assets/live-tracking.png'
import support from '../../../assets/Benefits/safe-delivery.png'
import support2 from '../../../assets/Benefits/safe-delivery - Copy.png'


const BenefitsSection = () => {
  const benefits = [
    {
      image: live,
      title: "Fast & Reliable Delivery",
      description:
        "We ensure quick parcel delivery with real-time tracking and safe handling.",
    },
    {
      image: support,
      title: "Secure Handling",
      description:
        "All parcels are carefully processed and protected throughout the journey.",
    },
    {
      image: support2,
      title: "24/7 Customer Support",
      description:
        "Our support team is always available to help you with parcel updates.",
    },
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Benefits</h2>
        <p className="text-gray-600">
          What makes our delivery service the best choice for your business.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6">
        {benefits.map((item, index) => (
          <BenefitCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

    </section>
  );
};

export default BenefitsSection;
