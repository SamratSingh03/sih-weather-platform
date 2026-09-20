import React, { useState } from 'react';
import type { User } from '../types/auth';
import { X, ShieldCheck, Mail, Lock, User as UserIcon, MapPin } from 'lucide-react';

interface PublicAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

export const PublicAuthModal: React.FC<PublicAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup form fields
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('Chennai');
  const [language, setLanguage] = useState('English');
  const [hasConsent, setHasConsent] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser: User = {
        id: 'usr-google-101',
        name: 'Ayushman Thakur',
        email: 'ayushman.thakur@gmail.com',
        role: 'public',
        city: 'Chennai',
        language: 'English'
      };
      onSuccessLogin(googleUser);
      onClose();
    }, 700);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: User = {
        id: `usr-${Math.floor(Math.random() * 1000)}`,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'public',
        city: 'Chennai'
      };
      onSuccessLogin(user);
      onClose();
    }, 600);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: User = {
        id: `usr-${Math.floor(Math.random() * 1000)}`,
        name: name || 'Citizen User',
        email: signupEmail,
        role: 'public',
        city: city,
        language: language
      };
      onSuccessLogin(newUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-blue-800 border border-blue-600 flex items-center justify-center mx-auto mb-3 text-white shadow-inner">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            {mode === 'login' ? 'Welcome to National Weather Intelligence' : 'Create Your Public Account'}
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            {mode === 'login'
              ? 'Access hyperlocal weather alerts and contribute observations from your area.'
              : 'Join citizens building real-time weather resilience across India.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {mode === 'login' ? (
            <>
              {/* Google Fast Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-lg shadow-xs flex items-center justify-center gap-3 cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">OR EMAIL SIGN IN</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="citizen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-600 font-semibold">Password</label>
                    <span className="text-[11px] text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-extrabold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
                >
                  {isLoading ? 'Authenticating...' : 'Log In to Citizen Portal'}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-100">
                <span className="text-slate-500">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-blue-900 hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </>
          ) : (
            /* Signup View */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Location / City</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="Marathi">Marathi (मराठी)</option>
                    <option value="Bengali">Bengali (বাংলা)</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 flex items-start gap-2 text-[11px] text-slate-700">
                <input
                  type="checkbox"
                  id="signup-consent"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-0.5"
                />
                <label htmlFor="signup-consent">
                  I agree that submitted reports may be used for weather intelligence. Personal identifiers will be anonymized per NDMA guidelines.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !hasConsent}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-extrabold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
              </button>

              <div className="text-center pt-2 border-t border-slate-100">
                <span className="text-slate-500">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-900 hover:underline cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
