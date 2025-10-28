
import React from 'react';
import { AppPermission, PermissionType } from '../types';
import PermissionIcon from './PermissionIcon';
import ToggleSwitch from './ToggleSwitch';

interface AppPermissionsProps {
  apps: AppPermission[];
  onTogglePermission: (appId: number, permission: PermissionType) => void;
}

const AppPermissions: React.FC<AppPermissionsProps> = ({ apps, onTogglePermission }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700/50">
      <h2 className="text-xl font-bold text-gray-200 mb-4">App Permissions Manager</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {apps.map(app => (
          <div key={app.id} className="bg-gray-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="bg-gray-700 p-2 rounded-full">{app.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{app.name}</h3>
                  <p className="text-sm text-gray-400">{app.category}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {Object.entries(app.permissions).map(([permission, isEnabled]) => (
                <div key={permission} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
                   <div className="flex items-center gap-2">
                     <PermissionIcon permission={permission as PermissionType} />
                     <span className="capitalize text-gray-300">{permission}</span>
                   </div>
                   <ToggleSwitch 
                     enabled={isEnabled}
                     onChange={() => onTogglePermission(app.id, permission as PermissionType)}
                   />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPermissions;
