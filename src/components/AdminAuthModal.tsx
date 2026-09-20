import React, { useState } from 'react';
import type { User } from '../types/auth';
import { X, ShieldAlert, Lock, UserCheck, AlertTriangle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: User) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [adminEmail, setAdminEmail] = useState('admin@weather.gov.in');
  const [adminPassword, setAdminPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const adminUser: User = {
        id: 'adm-001',
        name: 'NDMA Duty Officer',
        email: adminEmail,
        role: 'admin'
      };
      onSuccessLogin(adminUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl border-2 border-slate-800 shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Top Restricted Banner Header */}
        <div className="bg-slate-900 text-white p-6 text-center relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-600 flex items-center justify-center mx-auto mb-3 text-red-400 shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-red-900/60 text-red-200 border border-red-700/50 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Authorized Personnel Only
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white">
            ADMINISTRATOR ACCESS CONSOLE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            National Incident Response & Verification Operations
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="bg-amber-50 border-b border-amber-200 p-3 text-[11px] text-amber-900 flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Access is strictly logged and restricted to verified disaster-management authorities (NDMA/IMD/SDRF).</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Official Authority ID / Email
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="admin@weather.gov.in"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 italic">Prototype Demo ID: admin@weather.gov.in</p>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[10px]">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 italic">Prototype Demo Pass: demo123</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>{isLoading ? 'Verifying Credentials...' : 'Secure Admin Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
