import React, { createContext, useContext, useState, useEffect } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { BADGES_DATA } from '../data/badgesData';
import { MOCK_PORTFOLIO_DATA } from '../data/portfolioData';

const AppContext = createContext();

const INITIAL_PROFILE = {
  name: "Suhani Gupta",
  userType: "beginner", // 'beginner' | 'experienced' | 'demo'
  lifeStage: "student", // 'student' | 'intern' | 'first_paycheck' | 'early_career'
  incomeSource: "stipend", // 'family' | 'stipend' | 'part_time' | 'internship' | 'salary' | 'freelance'
  investmentCapacity: "1000_5000", // '0_1000' | '1000_5000' | '5000_10000' | '10000_plus'
  experienceLevel: "completely_new", // 'completely_new' | 'heard_about_it' | 'tried_little'
  goals: ["long_term_wealth", "higher_studies", "travel"],
  timeHorizon: "5plus", // 'less_1yr' | '1_3yr' | '3_5yr' | '5plus' | 'not_sure'
  riskComfort: "wait", // 'sell' | 'wait' | 'stay_invested'
  learningStyles: ["interactive", "short_reads"],
  archetype: "The Goal Builder",
  isExperienced: false
};

const INITIAL_GOALS = [
  {
    id: "g1",
    name: "Higher Studies / Course",
    category: "Education",
    emoji: "🎓",
    currentAmount: 30000,
    targetAmount: 80000,
    targetDate: "2027-06",
    isFlexible: false,
    monthlySIP: 2500,
    contributions: [
      { date: "2026-08-05", amount: 2500 },
      { date: "2026-09-05", amount: 2500 },
      { date: "2026-10-05", amount: 2500 }
    ]
  },
  {
    id: "g2",
    name: "Goa Trip with College Friends",
    category: "Travel",
    emoji: "✈️",
    currentAmount: 8000,
    targetAmount: 15000,
    targetDate: "2026-12",
    isFlexible: true,
    monthlySIP: 1500,
    contributions: [
      { date: "2026-08-10", amount: 3000 },
      { date: "2026-09-12", amount: 2500 },
      { date: "2026-10-01", amount: 2500 }
    ]
  },
  {
    id: "g3",
    name: "Emergency Rainy Day Buffer",
    category: "Safety",
    emoji: "🛟",
    currentAmount: 6500,
    targetAmount: 12000,
    targetDate: "2027-02",
    isFlexible: true,
    monthlySIP: 1000,
    contributions: [
      { date: "2026-09-01", amount: 3500 },
      { date: "2026-10-02", amount: 3000 }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Lesson Unlocked: What is a SIP?",
    message: "You've finished Week 1 basics. Learn how rupee-cost averaging works in 3 minutes.",
    time: "10m ago",
    read: false,
    type: "learning"
  },
  {
    id: "n2",
    title: "Goal Milestone: 37% Reached",
    message: "Your Higher Studies goal has crossed ₹30,000! Keep the habit going.",
    time: "2h ago",
    read: false,
    type: "goal"
  },
  {
    id: "n3",
    title: "Campus Masterclass this Saturday",
    message: "Investing 101: Pocket Money to First Portfolio starts Saturday at 5 PM.",
    time: "1d ago",
    read: true,
    type: "campus"
  }
];

export function AppProvider({ children }) {
  // Navigation
  const [currentView, setCurrentView] = useState("landing");
  
  // Profile & Onboarding
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("groww_firststep_profile");
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Gamification & Progress
  const [xp, setXp] = useState(450);
  const [streak, setStreak] = useState(4);
  const [unlockedBadges, setUnlockedBadges] = useState(["first_lesson", "learned_basics", "first_goal"]);
  const [completedLessons, setCompletedLessons] = useState(["what-is-investing", "saving-vs-investing", "stocks-vs-mutual-funds"]);
  const [first1kStep, setFirst1kStep] = useState(2); // 1-6

  // Goals
  const [goalsList, setGoalsList] = useState(INITIAL_GOALS);

  // First Paycheck Budget Planner
  const [budgetPlan, setBudgetPlan] = useState({
    income: 40000,
    needs: 20000,
    wants: 12000,
    investing: 5000,
    savings: 3000
  });

  // Simulator
  const [simulatorState, setSimulatorState] = useState({
    virtualBalance: 10000,
    allocations: {
      indexFund: 4000,
      bluechipStock: 2500,
      midcapETF: 1500,
      debtFund: 1000,
      cash: 1000
    },
    activeScenario: null,
    scenarioHistory: []
  });

  // Notifications
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Active Lesson Reader Modal
  const [activeLessonId, setActiveLessonId] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  // Registered campus events
  const [registeredEvents, setRegisteredEvents] = useState(["evt-1"]);

  // Ambassador application status
  const [ambassadorApplied, setAmbassadorApplied] = useState(false);

  // Save profile changes
  useEffect(() => {
    localStorage.setItem("groww_firststep_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  const showToast = (title, subtitle = "", earnedXp = 0) => {
    setToast({ title, subtitle, earnedXp });
    if (earnedXp > 0) {
      setXp(prev => prev + earnedXp);
    }
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const computeArchetype = (profile) => {
    if (profile.lifeStage === "first_paycheck") return "The First-Paycheck Investor";
    if (profile.incomeSource === "part_time" || profile.incomeSource === "freelance") return "The Flexible Investor";
    if (profile.goals && profile.goals.length > 0 && (profile.goals.includes("higher_studies") || profile.goals.includes("long_term_wealth"))) return "The Goal Builder";
    if (profile.experienceLevel === "completely_new") return "The Explorer";
    return "The Confident Beginner";
  };

  const completeOnboarding = (profileData) => {
    const archetype = computeArchetype(profileData);
    const updated = {
      ...userProfile,
      ...profileData,
      archetype
    };
    setUserProfile(updated);
    showToast("Profile Created!", `You are ${archetype}`, 100);
    navigateTo("profile_reveal");
  };

  const startDemoMode = () => {
    const demoProfile = {
      name: "Suhani Gupta (Demo)",
      userType: "demo",
      lifeStage: "student",
      incomeSource: "stipend",
      investmentCapacity: "1000_5000",
      experienceLevel: "completely_new",
      goals: ["long_term_wealth", "higher_studies", "travel"],
      timeHorizon: "5plus",
      riskComfort: "wait",
      learningStyles: ["interactive", "short_reads"],
      archetype: "The Goal Builder",
      isExperienced: false
    };
    setUserProfile(demoProfile);
    setXp(450);
    setStreak(4);
    setCompletedLessons(["what-is-investing", "saving-vs-investing", "stocks-vs-mutual-funds"]);
    setUnlockedBadges(["first_lesson", "learned_basics", "first_goal"]);
    setFirst1kStep(2);
    showToast("Demo Mode Active", "Exploring FirstStep with preloaded student profile", 50);
    navigateTo("home");
  };

  const loadProfilePreset = (presetKey) => {
    if (presetKey === "student") {
      setUserProfile({
        name: "Aman (Student)",
        userType: "beginner",
        lifeStage: "student",
        incomeSource: "stipend",
        investmentCapacity: "0_1000",
        experienceLevel: "completely_new",
        goals: ["higher_studies", "travel"],
        timeHorizon: "3_5yr",
        riskComfort: "wait",
        learningStyles: ["interactive", "quizzes"],
        archetype: "The Explorer",
        isExperienced: false
      });
      showToast("Preset Loaded", "Student Explorer (Pocket Money SIPs)");
    } else if (presetKey === "first_paycheck") {
      setUserProfile({
        name: "Rhea (First Job)",
        userType: "beginner",
        lifeStage: "first_paycheck",
        incomeSource: "salary",
        investmentCapacity: "5000_10000",
        experienceLevel: "heard_about_it",
        goals: ["long_term_wealth", "emergency_fund"],
        timeHorizon: "5plus",
        riskComfort: "stay_invested",
        learningStyles: ["short_reads", "interactive"],
        archetype: "The First-Paycheck Investor",
        isExperienced: false
      });
      showToast("Preset Loaded", "First-Paycheck (Salary Budgeting & Auto-SIP)");
    } else if (presetKey === "freelance") {
      setUserProfile({
        name: "Kabir (Freelance Designer)",
        userType: "beginner",
        lifeStage: "intern",
        incomeSource: "freelance",
        investmentCapacity: "1000_5000",
        experienceLevel: "completely_new",
        goals: ["laptop", "financial_safety"],
        timeHorizon: "1_3yr",
        riskComfort: "wait",
        learningStyles: ["learn_by_doing"],
        archetype: "The Flexible Investor",
        isExperienced: false
      });
      showToast("Preset Loaded", "Flexible Pace Investor (Annual Targets)");
    } else if (presetKey === "experienced") {
      setUserProfile({
        name: "Vikram (Active Investor)",
        userType: "experienced",
        lifeStage: "early_career",
        incomeSource: "salary",
        investmentCapacity: "10000_plus",
        experienceLevel: "tried_little",
        goals: ["long_term_wealth"],
        timeHorizon: "5plus",
        riskComfort: "stay_invested",
        learningStyles: ["short_reads"],
        archetype: "The Confident Beginner",
        isExperienced: true
      });
      showToast("Preset Loaded", "Experienced Investor Check-in");
    }
    navigateTo("home");
  };

  const completeLesson = (lessonId, score = 100) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      
      const lesson = LESSONS_DATA.find(l => l.id === lessonId);
      const earnedXP = lesson ? lesson.xp : 50;

      // Check badge triggers
      const newBadges = [...unlockedBadges];
      if (!newBadges.includes("first_lesson")) newBadges.push("first_lesson");
      if (updated.length >= 3 && !newBadges.includes("learned_basics")) newBadges.push("learned_basics");
      if (lessonId === "what-is-diversification" && !newBadges.includes("diversification_101")) newBadges.push("diversification_101");
      setUnlockedBadges(newBadges);

      showToast("Lesson Completed! 🎉", `+${earnedXP} XP earned`, earnedXP);
    }
  };

  const addGoal = (newGoal) => {
    const goalWithId = {
      ...newGoal,
      id: "g-" + Date.now(),
      contributions: [{ date: new Date().toISOString().split("T")[0], amount: newGoal.currentAmount || 0 }]
    };
    setGoalsList(prev => [goalWithId, ...prev]);
    if (!unlockedBadges.includes("first_goal")) {
      setUnlockedBadges(prev => [...prev, "first_goal"]);
    }
    showToast("Goal Created! 🎯", `Target: ₹${Number(newGoal.targetAmount).toLocaleString('en-IN')}`, 75);
  };

  const contributeToGoal = (goalId, amount) => {
    setGoalsList(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedAmount = g.currentAmount + Number(amount);
        return {
          ...g,
          currentAmount: updatedAmount,
          contributions: [
            ...g.contributions,
            { date: new Date().toISOString().split("T")[0], amount: Number(amount) }
          ]
        };
      }
      return g;
    }));
    showToast("Contribution Added! 🚀", `+₹${Number(amount).toLocaleString('en-IN')} added to goal`, 50);
  };

  const updateSimulator = (allocations) => {
    setSimulatorState(prev => ({
      ...prev,
      allocations
    }));
    showToast("Portfolio Rebalanced", "Virtual allocations updated");
  };

  const runScenario = (scenarioKey, userDecision) => {
    setSimulatorState(prev => ({
      ...prev,
      activeScenario: scenarioKey,
      scenarioHistory: [
        { scenarioKey, userDecision, timestamp: new Date().toISOString() },
        ...prev.scenarioHistory
      ]
    }));
    if (!unlockedBadges.includes("diversification_101")) {
      setUnlockedBadges(prev => [...prev, "diversification_101"]);
    }
    showToast("Scenario Simulated", `Decision: ${userDecision.toUpperCase()}`, 60);
  };

  const registerEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
      showToast("Event Registered! 🎟️", "Added to your calendar reminders", 50);
    }
  };

  const submitAmbassadorForm = (formData) => {
    setAmbassadorApplied(true);
    showToast("Application Submitted! 🌟", "Groww Campus team will review your application", 100);
  };

  const resetJourney = () => {
    setUserProfile(INITIAL_PROFILE);
    setXp(100);
    setStreak(1);
    setCompletedLessons([]);
    setUnlockedBadges([]);
    setGoalsList(INITIAL_GOALS);
    setFirst1kStep(1);
    setRegisteredEvents([]);
    setAmbassadorApplied(false);
    localStorage.removeItem("groww_firststep_profile");
    showToast("Journey Reset", "Started fresh with clean state");
    navigateTo("landing");
  };

  const openLesson = (lessonId) => {
    setActiveLessonId(lessonId);
  };

  const closeLesson = () => {
    setActiveLessonId(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        userProfile,
        setUserProfile,
        completeOnboarding,
        startDemoMode,
        loadProfilePreset,
        xp,
        streak,
        unlockedBadges,
        completedLessons,
        completeLesson,
        first1kStep,
        setFirst1kStep,
        goalsList,
        addGoal,
        contributeToGoal,
        budgetPlan,
        setBudgetPlan,
        simulatorState,
        updateSimulator,
        runScenario,
        notifications,
        setNotifications,
        activeLessonId,
        openLesson,
        closeLesson,
        toast,
        showToast,
        registeredEvents,
        registerEvent,
        ambassadorApplied,
        submitAmbassadorForm,
        resetJourney
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
