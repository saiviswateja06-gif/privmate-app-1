
import React, { useState, useMemo } from 'react';
import { AppPermission, Tracker, PermissionType } from './types';
import { INITIAL_APP_PERMISSIONS, INITIAL_TRACKERS } from './constants';
import PrivacyScoreCard from './components/PrivacyScoreCard';
import AppPermissions from './components/AppPermissions';
import ThirdPartyTrackers from './components/ThirdPartyTrackers';
import Recommendations from './components/Recommendations';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppPermission[]>(INITIAL_APP_PERMISSIONS);
  const [trackers, setTrackers] = useState<Tracker[]>(INITIAL_TRACKERS);

  const handleTogglePermission = (appId: number, permission: PermissionType) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.id === appId
          ? {
              ...app,
              permissions: {
                ...app.permissions,
                [permission]: !app.permissions[permission],
              },
            }
          : app
      )
    );
  };

  const privacyScore = useMemo(() => {
    const totalPermissions = apps.reduce((acc, app) => acc + Object.keys(app.permissions).length, 0);
    const enabledPermissions = apps.reduce((acc, app) => 
      acc + Object.values(app.permissions).filter(p => p).length
    , 0);

    if (totalPermissions === 0) return 100;
    
    const score = 100 - (enabledPermissions / totalPermissions) * 100;
    return Math.round(score);
  }, [apps]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-400 tracking-tight">Privacy Guardian AI</h1>
          <p className="text-gray-400 mt-2">Your personal dashboard for digital privacy control.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <PrivacyScoreCard score={privacyScore} />
            <ThirdPartyTrackers trackers={trackers} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <AppPermissions apps={apps} onTogglePermission={handleTogglePermission} />
            <Recommendations apps={apps} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
