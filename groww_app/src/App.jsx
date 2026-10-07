import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NotificationDrawer } from './components/NotificationDrawer';
import { Toast } from './components/Toast';

import { LandingView } from './views/LandingView';
import { BeginnerOnboarding } from './views/BeginnerOnboarding';
import { ExperiencedOnboarding } from './views/ExperiencedOnboarding';
import { ProfileRevealView } from './views/ProfileRevealView';
import { PersonalizedLearningPlanView } from './views/PersonalizedLearningPlanView';
import { HomeDashboard } from './views/HomeDashboard';
import { LearnView } from './views/LearnView';
import { LessonReaderModal } from './views/LessonReaderModal';
import { First1000JourneyView } from './views/First1000JourneyView';
import { SimulatorView } from './views/SimulatorView';
import { PracticeChartsView } from './views/PracticeChartsView';
import { PortfolioExplainerView } from './views/PortfolioExplainerView';
import { GoalsView } from './views/GoalsView';
import { AskGrowwView } from './views/AskGrowwView';
import { GrowwCampusView } from './views/GrowwCampusView';
import { SettingsView } from './views/SettingsView';

function AppContent() {
  const {
    currentView,
    activeLessonId,
    closeLesson,
    toast
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'beginner_onboarding':
        return <BeginnerOnboarding />;
      case 'experienced_onboarding':
        return <ExperiencedOnboarding />;
      case 'profile_reveal':
        return <ProfileRevealView />;
      case 'learning_plan_preview':
        return <PersonalizedLearningPlanView />;
      case 'home':
        return <HomeDashboard />;
      case 'learn':
        return <LearnView />;
      case 'practice_charts':
        return <PracticeChartsView />;
      case 'first1000':
        return <First1000JourneyView />;
      case 'simulator':
        return <SimulatorView />;
      case 'portfolio_explainer':
        return <PortfolioExplainerView />;
      case 'goals':
        return <GoalsView />;
      case 'ask_ai':
        return <AskGrowwView />;
      case 'campus':
        return <GrowwCampusView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main Content Area */}
      <main className="main-content">
        {renderCurrentView()}
      </main>

      {/* Bottom Nav Bar (Mobile & Desktop Primary Nav) */}
      <BottomNav />

      {/* Active Lesson Modal */}
      {activeLessonId && (
        <LessonReaderModal lessonId={activeLessonId} onClose={closeLesson} />
      )}

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
