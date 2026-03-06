import React from 'react';

interface ConfidenceIndicatorProps {
  score: number;
}

const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ score }) => {
  // Determine color based on confidence score
  let colorClass = '';
  if (score >= 70) {
    colorClass = 'bg-green-500';
  } else if (score >= 40) {
    colorClass = 'bg-yellow-500';
  } else {
    colorClass = 'bg-red-500';
  }

  return (
    <div className="flex items-center">
      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${Math.min(score, 100)}%` }}
        ></div>
      </div>
      <span className="text-xs font-medium">{score}%</span>
    </div>
  );
};

export default ConfidenceIndicator;