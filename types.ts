
// FIX: Import ReactElement to provide type for JSX components.
import type { ReactElement } from 'react';

export type PermissionType = 'camera' | 'microphone' | 'location' | 'contacts' | 'storage';

export interface AppPermission {
  id: number;
  name: string;
  // FIX: Use ReactElement instead of JSX.Element
  icon: ReactElement;
  permissions: { [key in PermissionType]?: boolean };
  category: string;
}

export interface Tracker {
  id: number;
  name: string;
  // FIX: Use ReactElement instead of JSX.Element
  logo: ReactElement;
  description: string;
  active: boolean;
}

export interface Recommendation {
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}