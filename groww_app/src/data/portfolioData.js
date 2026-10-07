export const MOCK_PORTFOLIO_DATA = {
  totalValue: 24850,
  investedValue: 22500,
  absoluteReturn: 2350,
  percentReturn: "+10.44%",
  allocation: {
    equity: 82,
    debt: 10,
    cash: 8
  },
  holdings: [
    {
      id: "h1",
      name: "ICICI Prudential Nifty 50 Index Fund Direct-Growth",
      category: "Equity: Large Cap / Index",
      amount: 10500,
      percentage: 42.2,
      expenseRatio: "0.18%",
      riskLevel: "Very High (Standard Equity)",
      purpose: "Low-cost exposure to India's top 50 bluechip companies."
    },
    {
      id: "h2",
      name: "Parag Parikh Flexi Cap Fund Direct-Growth",
      category: "Equity: Flexi Cap (Multi-Cap)",
      amount: 9850,
      percentage: 39.6,
      expenseRatio: "0.62%",
      riskLevel: "Very High (Active Equity)",
      purpose: "Actively managed fund investing across large, mid-cap, and international companies."
    },
    {
      id: "h3",
      name: "Axis Liquid Fund Direct-Growth",
      category: "Debt: Liquid Fund",
      amount: 2500,
      percentage: 10.1,
      expenseRatio: "0.15%",
      riskLevel: "Low",
      purpose: "Safe cash parking for short-term liquidity with next-day withdrawal."
    },
    {
      id: "h4",
      name: "Groww Balance / Cash",
      category: "Cash & Cash Equivalents",
      amount: 2000,
      percentage: 8.1,
      expenseRatio: "0.00%",
      riskLevel: "Zero Risk",
      purpose: "Available funds ready for upcoming SIP installments."
    }
  ],
  sectors: [
    { name: "Financial Services (Banks & NBFCs)", percentage: 32.5, color: "#3B82F6" },
    { name: "Information Technology", percentage: 18.2, color: "#10B981" },
    { name: "Oil, Gas & Consumable Fuels", percentage: 14.1, color: "#F59E0B" },
    { name: "Consumer Goods & FMCG", percentage: 11.8, color: "#8B5CF6" },
    { name: "Automobile & Components", percentage: 8.4, color: "#EC4899" },
    { name: "Debt & Liquid Parking", percentage: 15.0, color: "#64748B" }
  ],
  overlapAnalysis: {
    overlapPercentage: 42,
    fundsCompared: ["ICICI Nifty 50 Index Fund", "Parag Parikh Flexi Cap"],
    commonHoldings: [
      { company: "HDFC Bank Ltd", weightFundA: "7.1%", weightFundB: "6.2%", sector: "Banking" },
      { company: "Reliance Industries Ltd", weightFundA: "5.8%", weightFundB: "4.9%", sector: "Energy" },
      { company: "Infosys Ltd", weightFundA: "5.2%", weightFundB: "3.8%", sector: "IT" },
      { company: "ICICI Bank Ltd", weightFundA: "4.7%", weightFundB: "4.1%", sector: "Banking" },
      { company: "ITC Ltd", weightFundA: "3.9%", weightFundB: "3.5%", sector: "Consumer" }
    ],
    educationalInsight: "Owning 2 different mutual funds does not necessarily double your diversification. Over 42% of your equity money is in the exact same 5 giant companies. This is not necessarily bad, but understanding overlap helps you avoid buying redundant funds!"
  },
  riskSnapshot: {
    score: "Moderate to High Growth",
    description: "Your portfolio has 82% equity allocation, making it well-suited for a 5+ year time horizon where you can ride out short-term market corrections.",
    safetyBuffer: "₹4,500 (18.1%) is held in safe debt & cash, giving you liquidity for small sudden needs without touching equities."
  }
};
