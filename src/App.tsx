import { useState, useEffect } from 'react';
import type { WeatherReport, AdminKPIs } from './types/weather';
import type { User, AuthModalType } from './types/auth';
import { INITIAL_MOCK_REPORTS, INITIAL_ADMIN_KPIS } from './data/mockData';

import { GovernmentBar } from './components/GovernmentBar';
import { Navbar } from './components/Navbar';
import type { NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PublicAuthModal } from './components/PublicAuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';

import { LandingPage } from './views/LandingPage';
import { CitizenDashboard } from './views/CitizenDashboard';
import { PublicDashboard } from './views/PublicDashboard';
import { ReportEvent } from './views/ReportEvent';
import { MyReportsView } from './views/MyReportsView';
import { EventDetails } from './views/EventDetails';
import { AdminConsole } from './views/AdminConsole';
import { AnalyticsView } from './views/AnalyticsView';
import { AlertsView } from './views/AlertsView';
import { HowItWorksView } from './views/HowItWorksView';

export function App() {
  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sih_weather_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authModal, setAuthModal] = useState<AuthModalType>(null);
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    const savedUser = localStorage.getItem('sih_weather_user');
    if (!savedUser) return 'landing';
    const parsed: User = JSON.parse(savedUser);
    return parsed.role === 'admin' ? 'admin' : 'dashboard';
  });

  // App Centralized Reports State
  const [reports, setReports] = useState<WeatherReport[]>(INITIAL_MOCK_REPORTS);
  const [kpis, setKpis] = useState<AdminKPIs>(INITIAL_ADMIN_KPIS);
  const [selectedReport, setSelectedReport] = useState<WeatherReport | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('sih_weather_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sih_weather_user');
    }
  }, [user]);

  const handlePublicLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setActiveTab('dashboard');
    showToast(`Welcome back, ${authenticatedUser.name}! Signed in to Citizen Portal.`);
  };

  const handleAdminLoginSuccess = (adminUser: User) => {
    setUser(adminUser);
    setActiveTab('admin');
    showToast('Secure Disaster Management Control Room session active.');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedReport(null);
    setActiveTab('landing');
    showToast('You have been logged out.');
  };

  const handleTabChange = (tab: NavTab) => {
    // Role protection check
    if ((tab === 'admin' || tab === 'analytics') && user?.role !== 'admin') {
      showToast('Administrator access required. Access restricted to authorized personnel.');
      setAuthModal('admin-login');
      return;
    }

    if (tab === 'my-reports' && !user) {
      setAuthModal('public-login');
      return;
    }

    setActiveTab(tab);
    setSelectedReport(null);
  };

  const handleSelectReport = (report: WeatherReport) => {
    setSelectedReport(report);
  };

  const handleAddReport = (newReport: WeatherReport) => {
    setReports((prev) => [newReport, ...prev]);
    setKpis((prev) => ({
      ...prev,
      reportsToday: prev.reportsToday + 1,
      pendingVerification: prev.pendingVerification + 1,
    }));
    showToast(`Weather report ${newReport.id} submitted and ingested!`);
  };

  const handleVerifyReport = (id: string) => {
    if (user?.role !== 'admin') {
      showToast('Only authorized emergency operators can verify reports.');
      return;
    }
    setReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, verificationStatus: 'AI Verified' as const, confidence: Math.max(r.confidence, 94) }
          : r
      )
    );
    setKpis((prev) => ({
      ...prev,
      pendingVerification: Math.max(0, prev.pendingVerification - 1),
      aiVerified: prev.aiVerified + 1,
    }));
  };

  const handleRejectReport = (id: string) => {
    if (user?.role !== 'admin') {
      showToast('Only authorized emergency operators can reject reports.');
      return;
    }
    setReports((prev) => prev.filter((r) => r.id !== id));
    setKpis((prev) => ({
      ...prev,
      pendingVerification: Math.max(0, prev.pendingVerification - 1),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 1. Top Government Banner */}
      <GovernmentBar />

      {/* 2. Main Primary Navigation Header */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenPublicAuth={(mode) => setAuthModal(mode === 'signup' ? 'public-signup' : 'public-login')}
        onOpenAdminAuth={() => setAuthModal('admin-login')}
        onLogout={handleLogout}
      />

      {/* 3. Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedReport ? (
          <EventDetails
            report={selectedReport}
            onBack={() => setSelectedReport(null)}
          />
        ) : activeTab === 'landing' && !user ? (
          <LandingPage
            onOpenPublicAuth={(mode) => setAuthModal(mode === 'signup' ? 'public-signup' : 'public-login')}
            onOpenAdminAuth={() => setAuthModal('admin-login')}
            onExploreLiveMap={() => setActiveTab('map')}
            onReportEvent={() => {
              if (!user) setAuthModal('public-login');
              else setActiveTab('report');
            }}
            reports={reports}
          />
        ) : user?.role === 'admin' && activeTab === 'admin' ? (
          <AdminConsole
            reports={reports}
            kpis={kpis}
            onVerifyReport={handleVerifyReport}
            onRejectReport={handleRejectReport}
            onSelectReport={handleSelectReport}
            showToast={showToast}
          />
        ) : activeTab === 'dashboard' && user?.role === 'public' ? (
          <CitizenDashboard
            user={user}
            reports={reports}
            onSelectReport={handleSelectReport}
            onNavigateToReport={() => setActiveTab('report')}
            onNavigateToMyReports={() => setActiveTab('my-reports')}
            onNavigateToAlerts={() => setActiveTab('alerts')}
          />
        ) : activeTab === 'my-reports' && user?.role === 'public' ? (
          <MyReportsView
            user={user}
            reports={reports}
            onNavigateToReport={() => setActiveTab('report')}
            onSelectReport={handleSelectReport}
          />
        ) : activeTab === 'report' ? (
          <ReportEvent
            onAddReport={handleAddReport}
            onSelectReport={handleSelectReport}
            onNavigateHome={() => setActiveTab(user?.role === 'admin' ? 'admin' : user ? 'dashboard' : 'landing')}
          />
        ) : activeTab === 'analytics' && user?.role === 'admin' ? (
          <AnalyticsView reports={reports} />
        ) : activeTab === 'alerts' ? (
          <AlertsView
            reports={reports}
            onSelectReport={handleSelectReport}
          />
        ) : activeTab === 'how-it-works' ? (
          <HowItWorksView />
        ) : (
          /* Default Map / Public Intelligence View */
          <PublicDashboard
            reports={reports}
            onSelectReport={handleSelectReport}
            onNavigateToReport={() => setActiveTab('report')}
          />
        )}
      </main>

      {/* 4. Official Footer */}
      <Footer />

      {/* 5. Modals */}
      <PublicAuthModal
        isOpen={authModal === 'public-login' || authModal === 'public-signup'}
        initialMode={authModal === 'public-signup' ? 'signup' : 'login'}
        onClose={() => setAuthModal(null)}
        onSuccessLogin={handlePublicLoginSuccess}
      />

      <AdminAuthModal
        isOpen={authModal === 'admin-login'}
        onClose={() => setAuthModal(null)}
        onSuccessLogin={handleAdminLoginSuccess}
      />

      {/* 6. Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
