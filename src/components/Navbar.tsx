import React from 'react';
import type { User } from '../types/auth';
import { 
  CloudSun, 
  Map, 
  PlusCircle, 
  AlertTriangle, 
  BarChart3, 
  HelpCircle, 
  User as UserIcon, 
  ShieldAlert,
  LayoutDashboard,
  LogOut,
  FileText,
  Home
} from 'lucide-react';

export type NavTab = 
  | 'landing'
  | 'dashboard' 
  | 'map' 
  | 'report' 
  | 'my-reports'
  | 'alerts' 
  | 'analytics' 
  | 'how-it-works' 
  | 'admin';

interface NavbarProps {
  user: User | null;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenPublicAuth: (mode?: 'login' | 'signup') => void;
  onOpenAdminAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenPublicAuth,
  onOpenAdminAuth,
  onLogout,
}) => {
  
  // Define nav links depending on auth role
  const getNavItems = () => {
    if (!user) {
      // Unauthenticated / Landing Page Navigation
      return [
        { id: 'landing', label: 'Home', icon: Home },
        { id: 'map', label: 'Live Intelligence', icon: Map },
        { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
        { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
      ];
    }

    if (user.role === 'public') {
      // Logged-in Citizen Navigation
      return [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'alerts', label: 'Nearby Alerts', icon: AlertTriangle },
        { id: 'map', label: 'Live Map', icon: Map },
        { id: 'report', label: 'Report Event', icon: PlusCircle },
        { id: 'my-reports', label: 'My Reports', icon: FileText },
        { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
      ];
    }

    // Admin Navigation
    return [
      { id: 'admin', label: 'Control Queue', icon: LayoutDashboard },
      { id: 'map', label: 'Live Map', icon: Map },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
      { id: 'how-it-works', label: 'Architecture', icon: HelpCircle },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-blue-950 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              if (!user) setActiveTab('landing');
              else if (user.role === 'admin') setActiveTab('admin');
              else setActiveTab('dashboard');
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-inner group-hover:bg-blue-500 transition-colors">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg leading-tight tracking-tight flex items-center gap-2">
                National Weather Intelligence
              </div>
              <div className="text-[11px] text-blue-200 font-medium">
                {user?.role === 'admin' ? (
                  <span className="text-emerald-400 font-bold">DISASTER CONTROL ROOM CONSOLE</span>
                ) : (
                  'AI-Verified Hyperlocal Platform'
                )}
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as NavTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-sm ring-1 ring-blue-600'
                      : 'text-blue-100 hover:bg-blue-900/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-90" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Auth State & Action Buttons */}
          <div className="flex items-center gap-3">
            {!user ? (
              /* Unauthenticated State Buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenPublicAuth('login')}
                  className="bg-white hover:bg-slate-100 text-blue-950 text-xs font-extrabold px-3.5 py-2 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-800" />
                  <span>Public Login</span>
                </button>

                <button
                  onClick={onOpenAdminAuth}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold px-3.5 py-2 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 border border-emerald-500/40"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Admin Login</span>
                </button>
              </div>
            ) : (
              /* Authenticated User Badge & Logout */
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-blue-900/80 px-3 py-1 rounded-lg border border-blue-800 text-xs">
                  {user.role === 'admin' ? (
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-blue-300" />
                  )}
                  <div>
                    <div className="font-bold text-white leading-tight">{user.name}</div>
                    <div className="text-[10px] text-blue-300 capitalize">
                      {user.role === 'admin' ? 'Duty Officer (Admin)' : 'Public Citizen'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="bg-red-900/80 hover:bg-red-800 text-red-200 hover:text-white border border-red-700/60 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden bg-blue-900 border-t border-blue-800 px-3 py-2 flex items-center overflow-x-auto gap-1 text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap ${
                isActive ? 'bg-blue-700 text-white' : 'text-blue-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
