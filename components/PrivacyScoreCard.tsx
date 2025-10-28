
import React from 'react';

interface PrivacyScoreCardProps {
  score: number;
}

const PrivacyScoreCard: React.FC<PrivacyScoreCardProps> = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 75) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-500';
  };
  
  const getStrokeColor = () => {
    if (score >= 75) return 'stroke-green-400';
    if (score >= 40) return 'stroke-yellow-400';
    return 'stroke-red-500';
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-700/50">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Privacy Score</h2>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={`${getStrokeColor()} transition-all duration-1000 ease-in-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-extrabold ${getScoreColor()}`}>{score}</span>
          <span className="text-gray-400 font-medium">out of 100</span>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-4">A higher score means better privacy protection.</p>
    </div>
  );
};

export default PrivacyScoreCard;
