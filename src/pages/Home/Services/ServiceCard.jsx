// src/components/services/ServiceCard.jsx

const ServiceCard = ({ service }) => {
    const {title, description, icon} = service;
  return (
    <div className="card bg-base-100 shadow-md p-6 hover:shadow-xl border border-base-200 rounded-xl hover:-translate-y-1 duration-200">
      <div className="text-primary mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>

      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
