// src/components/benefits/BenefitCard.jsx

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="card bg-base-100 shadow-md border p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
      
      {/* Left Image */}
      <figure className="w-full md:w-40 flex justify-center">
        <img
          src={image}
          alt={title}
          className="w-28 h-28 object-contain"
        />
      </figure>

      {/* Divider */}
      <div className="hidden md:block h-24 w-px bg-gray-300"></div>

      {/* Right Content */}
      <div className="card-body p-0 text-center md:text-left">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
    </div>
  );
};

export default BenefitCard;
