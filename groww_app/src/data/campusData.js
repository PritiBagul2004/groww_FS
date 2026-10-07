export const CAMPUS_DATA = {
  events: [
    {
      id: "evt-1",
      title: "Investing 101: Pocket Money to First Portfolio",
      speaker: "Groww Product & Financial Education Team",
      date: "Saturday, 12 Oct • 5:00 PM IST",
      type: "Live Interactive Masterclass",
      attendees: 1420,
      tags: ["Beginner Friendly", "College Students"],
      summary: "Understand how to start investing with just ₹500/month, demystify mutual funds, and avoid common rookie mistakes."
    },
    {
      id: "evt-2",
      title: "Decoding Your First Paycheck: Salary, Tax & SIPs",
      speaker: "Early-Career Wealth Specialists",
      date: "Sunday, 20 Oct • 6:30 PM IST",
      type: "Workshop & Q&A",
      attendees: 890,
      tags: ["First Job", "Tax Basics"],
      summary: "How to budget your new salary (50/30/20 rule), save income tax under new regime, and automate your first SIP."
    },
    {
      id: "evt-3",
      title: "Index Funds vs Stock Picking: What Really Works?",
      speaker: "Quantitative Research Analysts",
      date: "Wednesday, 23 Oct • 7:00 PM IST",
      type: "Fireside Chat",
      attendees: 640,
      tags: ["Deep Dive", "Passive Investing"],
      summary: "Reviewing 20 years of Indian market history to see why low-cost index funds beat most active stock pickers."
    }
  ],
  challenges: [
    {
      id: "chal-1",
      title: "Virtual ₹10,000 Diversified Builder",
      rewardXP: 150,
      badge: "Diversification Master",
      participants: 3450,
      description: "Build a virtual portfolio with at least 3 distinct asset classes and test it against a 15% simulated market crash.",
      status: "Active"
    },
    {
      id: "chal-2",
      title: "7-Day Investing Terminology Sprint",
      rewardXP: 200,
      badge: "Habit Champion",
      participants: 5120,
      description: "Complete one 2-minute lesson quiz every day for 7 consecutive days.",
      status: "Active"
    },
    {
      id: "chal-3",
      title: "First Goal Milestone Sprint",
      rewardXP: 100,
      badge: "Goal Builder",
      participants: 2890,
      description: "Define a specific goal with a target date and simulate your first ₹500 contribution.",
      status: "Active"
    }
  ],
  leaderboard: [
    { rank: 1, name: "Aarav Sharma", college: "IIT Bombay", xp: 1450, streak: 18, badges: 6 },
    { rank: 2, name: "Priya Nair", college: "SRCC Delhi", xp: 1320, streak: 15, badges: 6 },
    { rank: 3, name: "Rohan Varma", college: "BITS Pilani", xp: 1200, streak: 14, badges: 5 },
    { rank: 4, name: "Ananya Iyer", college: "Christ University", xp: 1050, streak: 12, badges: 5 },
    { rank: 5, name: "You (Suhani)", college: "Campus Explorer", xp: 450, streak: 4, badges: 3, isUser: true },
    { rank: 6, name: "Kunal Deshmukh", college: "VIT Vellore", xp: 420, streak: 3, badges: 2 }
  ],
  ambassadorProgram: {
    title: "Become a Groww Campus Ambassador",
    subtitle: "Lead the financial literacy movement in your college campus.",
    responsibilities: [
      "Organize peer-led financial literacy workshops and quiz sessions.",
      "Help classmates debunk social media stock-tip scams and learn responsible investing.",
      "Host campus challenges and demo trading simulations.",
      "Provide feedback directly to the Groww product team on student financial needs."
    ],
    perks: [
      "Official Certificate of Leadership from Groww.",
      "Exclusive mentorship sessions with Groww Product & Tech leaders.",
      "Fast-track interview considerations for Groww internships & early-career roles.",
      "Exclusive Groww Swag kit and campus event sponsorship."
    ]
  }
};
