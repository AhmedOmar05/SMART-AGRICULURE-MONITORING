import React from "react";
import "./timeline.css";

const features = [
  {
    
    title: "Smart Irrigation System",
    description:
      "Automates water delivery based on real-time soil moisture data, saving water and improving crop yield.",
  },
  {
   
    title: "Real-Time Weather Monitoring",
    description:
      "Provides farmers with local weather conditions to make timely farming decisions.",
  },
  {
   
    title: "Pest Detection AI",
    description:
      "Detects and alerts about pest infestations using image recognition and machine learning.",
  },
  {
  
    title: "Soil Nutrient Analyzer",
    description:
      "Analyzes soil quality and gives recommendations on fertilizers, improving soil health sustainably.",
  },
  {
   
    title: "Crop Health Monitoring",
    description:
      "Uses multispectral camera sensors to analyze plant health and detect diseases early.",
  },
  {
   
    title: "Smart Farm Dashboard",
    description:
      "An integrated dashboard that shows live data from all sensors and offers actionable insights.",
  },
];

const AgriSmartTimeline = () => {
  return (
    <div className="bg-green-50 min-h-screen py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
        🌾 AgriSmart Feature 
      </h2>

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {features.map((feature, index) => (
          <li key={index} className="feature-blur group">
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`timeline-${
                index % 2 === 0 ? "start md:text-end" : "end"
              } mb-10`}
            >
              <time className="font-mono italic text-green-600">
                {feature.year}
              </time>
              <div className="text-lg font-black text-green-800">
                {feature.title}
              </div>
              <p className="text-green-700">{feature.description}</p>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgriSmartTimeline;
