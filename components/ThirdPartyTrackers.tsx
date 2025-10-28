
import React from 'react';
import { Tracker } from '../types';

interface ThirdPartyTrackersProps {
  trackers: Tracker[];
}

const ThirdPartyTrackers: React.FC<ThirdPartyTrackersProps> = ({ trackers }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700/50">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Third-Party Trackers</h2>
      <div className="space-y-3">
        {trackers.map(tracker => (
          <div key={tracker.id} className="flex items-start gap-4 bg-gray-900/70 p-3 rounded-lg">
            <div className="flex-shrink-0">{tracker.logo}</div>
            <div>
              <h3 className="font-semibold text-white">{tracker.name}</h3>
              <p className="text-sm text-gray-400">{tracker.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdPartyTrackers;
