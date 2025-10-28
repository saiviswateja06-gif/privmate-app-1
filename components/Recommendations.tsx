
import React, { useState, useCallback } from 'react';
import { AppPermission, Recommendation } from '../types';
import { getPrivacyRecommendations } from '../services/geminiService';
import Spinner from './Spinner';

interface RecommendationsProps {
  apps: AppPermission[];
}

const SeverityBadge: React.FC<{ severity: 'High' | 'Medium' | 'Low' }> = ({ severity }) => {
  const baseClasses = 'px-2 py-0.5 text-xs font-semibold rounded-full';
  const colorClasses = {
    High: 'bg-red-500/20 text-red-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Low: 'bg-green-500/20 text-green-400',
  };
  return <span className={`${baseClasses} ${colorClasses[severity]}`}>{severity} Risk</span>;
};

const Recommendations: React.FC<RecommendationsProps> = ({ apps }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const result = await getPrivacyRecommendations(apps);
      setRecommendations(result);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [apps]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-200">AI Privacy Advisor</h2>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Spinner /> : 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          }
          Analyze My Privacy
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-400">
          <p>Analyzing your settings with AI...</p>
        </div>
      )}
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {!loading && recommendations.length === 0 && !error && (
        <p className="text-center text-gray-400">Click "Analyze My Privacy" to get personalized recommendations.</p>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gray-900/70 p-4 rounded-lg border-l-4 border-cyan-500">
              <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white mb-1">{rec.title}</h3>
                  <SeverityBadge severity={rec.severity} />
              </div>
              <p className="text-sm text-gray-400">{rec.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
