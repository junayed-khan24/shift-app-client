import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
    name: "Awlad Hossin",
    position: "Senior Product Designer",
  },
  {
    id: 2,
    text: "This product greatly improved my sitting posture. Highly recommended!",
    name: "Nasir Uddin",
    position: "CEO",
  },
  {
    id: 3,
    text: "Amazing build quality and very comfortable to use.",
    name: "Rasel Ahamed",
    position: "CTO",
  },
  {
    id: 4,
    text: "Helped reduce my neck pain within weeks. Very effective!",
    name: "Shakil Khan",
    position: "Manager",
  },
  {
    id: 5,
    text: "A must‑have product for long desk workers.",
    name: "Aisha Rahman",
    position: "UX Designer",
  },
  {
    id: 6,
    text: "Comfortable and well‑designed posture support.",
    name: "Maruf Islam",
    position: "Developer",
  },
  {
    id: 7,
    text: "Affordable and works like magic!",
    name: "Nadia Noor",
    position: "Teacher",
  },
  {
    id: 8,
    text: "My back pain reduced significantly after using it.",
    name: "Jibon Das",
    position: "Engineer",
  },
  {
    id: 9,
    text: "Perfect for correcting posture while working long hours.",
    name: "Sonia Akter",
    position: "Project Manager",
  },
  {
    id: 10,
    text: "Very lightweight and easy to wear for long periods.",
    name: "Mehedi Hasan",
    position: "Freelancer",
  },
];

const Review = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          What our customers are saying
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with our posture support.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto flex items-center justify-center">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="btn btn-circle absolute left-0 -ml-14 hidden md:flex"
        >
          <ChevronLeft />
        </button>

        {/* Slide Card */}
        <ReviewCard review={reviews[current]} />

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="btn btn-circle absolute bg-green-500 right-0 -mr-14 hidden md:flex"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-green-500 w-6" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Review;
