// src/components/services/ServiceCard.jsx

const ServiceCard = ({ service }) => {
    const {title, description, icon} = service;
  return (
   <div className="card bg-base-100 shadow-md p-6 hover:bg-[#CAEB66] group hover:text-gray-700 text-center items-center hover:shadow-xl border border-base-200 rounded-xl hover:-translate-y-1 duration-900">
      
      <div className="text-primary mb-4 group-hover:text-gray-700">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-gray-700">
        {title}
      </h3>

      <p className="text-sm text-gray-600 group-hover:text-gray-700">
        {description}
      </p>
</div>
  );
};

export default ServiceCard;
