// src/components/services/ServicesSection.jsx
import {
  FiTruck,
  FiMapPin,
  FiPackage,
  FiDollarSign,
  FiBriefcase,
  FiRefreshCw,
} from "react-icons/fi";

import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      icon: <FiTruck size={40} />,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: <FiMapPin size={40} />,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FiPackage size={40} />,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: <FiDollarSign size={40} />,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: <FiBriefcase size={40} />,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: <FiRefreshCw size={40} />,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section className="py-16">
      {/* Title + Subtext */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
