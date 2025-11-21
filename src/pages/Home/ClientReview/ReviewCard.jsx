import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className=" shadow-md rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200">
      <p className="text-4xl text-gray-400 mb-4">“</p>
      <p className="text-gray-600 mb-6 leading-relaxed">{review.text}</p>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div>
          <h4 className="font-semibold text-gray-800">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.position}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
