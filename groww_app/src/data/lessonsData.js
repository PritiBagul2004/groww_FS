export const LESSONS_DATA = [
  // ==========================================
  // 📈 READING CHARTS MODULE (NEW)
  // ==========================================
  {
    id: "understanding-price-charts",
    title: "Lesson 1 — Understanding a Price Chart",
    category: "READING CHARTS",
    week: 1,
    duration: "3 min",
    xp: 60,
    hasInteractiveChart: "line_price",
    summary: "X-axis = time, Y-axis = price. Learn how to spot highs, lows, and trends across timeframes.",
    explanation: `A price chart is simply a visual diary of how buyers and sellers valued a stock or mutual fund over time.

**The Two Axes:**
- **Horizontal Axis (X-axis):** Represents **Time** (moving from left to right: minutes, days, months, or years).
- **Vertical Axis (Y-axis):** Represents **Price** in Rupees (₹).

**Key Landmarks on Every Chart:**
- **Open Price:** The price at the very beginning of the selected timeframe.
- **Close / Current Price:** The latest price traded.
- **High Point:** The topmost peak on the chart during that period.
- **Low Point:** The lowest valley reached.
- **Trend:** An upward slope means growing demand; a downward slope indicates selling pressure.

**Timeframes (1D, 1W, 1M, 1Y, 5Y):**
Switching timeframes zooms in and out. A stock might look "down" on a 1-day chart (-1%), but zooming out to a 5-year chart shows a massive upward trend (+120%)!`,
    analogy: `Think of a price chart like a fitness tracker step counter. Looking at your steps over the last 1 hour might show you sitting still (flat line), but looking at your yearly chart shows you walked 2,000 kilometers! Always zoom out before judging an investment.`,
    whyItMatters: `Beginners often panic when they open an app and see a red 1-day chart. Knowing how to switch to 1-year or 5-year views helps you ignore daily market noise.`,
    commonMisconception: `**Myth:** "A line going down today means the company is doomed."
**Reality:** Short-term fluctuations happen every minute due to small trades; long-term value follows corporate earnings over years.`,
    deepDive: `Use the interactive line chart above to hover over different dates, observe the high and low points, and switch between 1M, 1Y, and 5Y timeframes.`,
    quiz: [
      {
        question: "What does the horizontal (X-axis) on a standard price chart represent?",
        options: [
          "The price of the stock in Rupees",
          "Time (e.g. days, months, years)",
          "The number of company employees",
          "Government interest rates"
        ],
        correctIndex: 1,
        explanation: "The X-axis always measures the progression of time from past to present."
      },
      {
        question: "If a stock is down 1.5% on a 1-Day chart, what should a long-term investor do to get the full picture?",
        options: [
          "Sell everything immediately in panic",
          "Zoom out to 1-Year or 5-Year timeframes to evaluate the broader long-term trend",
          "Delete the Groww app",
          "Borrow loans to day-trade"
        ],
        correctIndex: 1,
        explanation: "Zooming out reveals whether a daily drop is merely temporary noise in an otherwise strong multi-year growth trend."
      }
    ]
  },
  {
    id: "candlestick-charts-101",
    title: "Lesson 2 — Candlestick Charts",
    category: "READING CHARTS",
    week: 1,
    duration: "4 min",
    xp: 65,
    hasInteractiveChart: "candlestick_anatomy",
    summary: "Open, High, Low, Close (OHLC). Decode green and red candles without confusing jargon.",
    explanation: `While a simple line chart only connects closing prices, a **Candlestick Chart** packs 4 important pieces of information into a single bar:

1. **Open:** Price where trading started.
2. **Close:** Price where trading ended.
3. **High:** The highest price reached during the period (top of the upper wick).
4. **Low:** The lowest price dipped (bottom of the lower wick).

**Color Code:**
- 🟢 **Green (Bullish) Candle:** The price **closed higher** than it opened (Buyers won). The bottom of the body is Open, the top is Close.
- 🔴 **Red (Bearish) Candle:** The price **closed lower** than it opened (Sellers won). The top of the body is Open, the bottom is Close.

**The Wicks (Shadows):**
The thin lines sticking out above and below the rectangle body show the highest and lowest price extremes that traders explored before settling.`,
    analogy: `Think of a candlestick like a tug-of-war match. The body shows where the rope ended up relative to where it started. The wicks show how far each team pulled the rope back and forth during the match before time ran out!`,
    whyItMatters: `Candlesticks give you an instant snapshot of buyer vs seller momentum during that specific day or week.`,
    commonMisconception: `**Myth:** "Red candles mean you lost real money."
**Reality:** A red candle simply means that on that single timeframe, the closing price was lower than the opening price.`,
    deepDive: `A tall candle body shows strong directional momentum, while a tiny body with long wicks shows indecision between buyers and sellers.`,
    quiz: [
      {
        question: "What does a Green (Bullish) candle signify?",
        options: [
          "The price closed lower than it opened",
          "The price closed higher than it opened (buyers pushed the price up)",
          "The stock is guaranteed to double tomorrow",
          "The stock has zero trading volume"
        ],
        correctIndex: 1,
        explanation: "Green indicates that the closing price finished above the starting opening price."
      },
      {
        question: "What do the thin lines (wicks/shadows) above and below the candle body represent?",
        options: [
          "Government taxes deducted",
          "The highest and lowest price extremes reached during the timeframe",
          "The company's dividend payout dates",
          "Software glitches in the charting engine"
        ],
        correctIndex: 1,
        explanation: "The upper wick tip is the highest price traded; the lower wick tip is the lowest price reached."
      }
    ]
  },
  {
    id: "reading-trading-volume",
    title: "Lesson 3 — Reading Trading Volume",
    category: "READING CHARTS",
    week: 2,
    duration: "3 min",
    xp: 60,
    hasInteractiveChart: "volume_sync",
    summary: "Price tells you what happened; Volume tells you how many people participated.",
    explanation: `**Volume** measures the total number of shares bought and sold during a specific time period.

On modern financial charts, volume is displayed as a vertical bar chart right beneath the price line.

**Why Volume Matters:**
- **Price Jump + High Volume:** Strong conviction. Many institutional and retail investors are actively buying, confirming the price move.
- **Price Jump + Tiny Volume:** Weak conviction. A small trade might have moved the price temporarily, but there is little real market backing.
- **Sharp Fall + Massive Volume:** Heavy institutional selling or major breaking news.`,
    analogy: `Imagine a restaurant. If 2 people rave about a dish (low volume), you take it with a grain of salt. But if 500 people are lined up out the door ordering that same dish (high volume spike), you know there is genuine massive demand!`,
    whyItMatters: `Checking volume prevents you from being tricked by low-volume penny stock price spikes that quickly collapse.`,
    commonMisconception: `**Myth:** "High volume only happens when stock prices rise."
**Reality:** High volume can happen on both green days (heavy buying) and red days (heavy selling).`,
    deepDive: `Always look at volume when a stock breaks past its previous all-time high—high volume confirms genuine market interest.`,
    quiz: [
      {
        question: "If a stock price jumps +8% in a single day, what should you inspect beneath the price to check market conviction?",
        options: [
          "The CEO's social media follower count",
          "The Trading Volume bars (to see how many shares were traded)",
          "The color of the bank's debit card",
          "The astrological star chart"
        ],
        correctIndex: 1,
        explanation: "Volume confirms whether a price move has widespread investor participation or is just temporary low-liquidity noise."
      }
    ]
  },
  {
    id: "calculating-returns",
    title: "Lesson 4 — Understanding Returns: Absolute vs %",
    category: "READING CHARTS",
    week: 2,
    duration: "4 min",
    xp: 65,
    hasInteractiveChart: "returns_calc",
    summary: "Why a ₹20 gain on a ₹100 stock is 10x better than a ₹20 gain on a ₹1,000 stock.",
    explanation: `When looking at portfolio performance, understanding the difference between **Absolute Rupees** and **Percentage Return** is critical:

**1. Absolute Price Change:**
Formula: \`Ending Price - Starting Price\`
Example: A stock goes from ₹100 to ₹120. The absolute gain is **+₹20**.

**2. Percentage Return:**
Formula: \`((Ending Price - Starting Price) / Starting Price) * 100\`
Example: \`((120 - 100) / 100) * 100\` = **+20% Return**!

Now compare that to an expensive stock that moves from ₹1,000 to ₹1,020:
- Absolute gain is also ₹20.
- But the percentage return is only **+2%**!

**Daily Return vs Cumulative Return:**
- **Daily Return:** The price change from yesterday's close to today's close (+0.8%, -1.2%).
- **Cumulative Return:** The total compounded return since the day you first purchased the asset.`,
    analogy: `If you score 20 marks in an exam, is that good? If the exam was out of 25 marks (80%), it's incredible! If the exam was out of 500 marks (4%), it's poor. Percentage return standardizes performance so you can compare any two investments fairly.`,
    whyItMatters: `Evaluating by percentage return allows you to compare a ₹500 mutual fund SIP fairly against a ₹50,000 bluechip portfolio.`,
    commonMisconception: `**Myth:** "High stock price means high returns."
**Reality:** Percentage growth of the underlying business determines your return, not whether the stock costs ₹50 or ₹5,000.`,
    deepDive: `Cumulative returns over 5+ years benefit from compounding, turning steady 12% annual returns into multiples of your original capital.`,
    quiz: [
      {
        question: "You buy a mutual fund unit at ₹200 and it rises to ₹250. What is your percentage return?",
        options: [
          "+50%",
          "+25% (₹50 gain on ₹200 cost)",
          "+10%",
          "+5%"
        ],
        correctIndex: 1,
        explanation: "(250 - 200) / 200 = 50 / 200 = 25% return."
      }
    ]
  },
  {
    id: "understanding-volatility-charts",
    title: "Lesson 5 — Spotting Volatility: Smooth vs Bumpy Paths",
    category: "READING CHARTS",
    week: 3,
    duration: "4 min",
    xp: 65,
    hasInteractiveChart: "volatility_compare",
    summary: "Investment A moves steadily; Investment B swings wildly. How to evaluate risk visually.",
    explanation: `Two investments can end up at the exact same final value (e.g., growing from ₹10,000 to ₹15,000 over 3 years), but the **path they took to get there** can be completely different:

- **Investment A (Steady Growth / Low Volatility):** Small, smooth upward steps with minor 2-3% fluctuations (like a Conservative Balanced Fund).
- **Investment B (Wild Swings / High Volatility):** Dramatic surges (+30%), sharp crashes (-25%), rollercoaster loops (like Small-Cap or Single Tech Stocks).

**The Core Lesson:**
A higher final return does not automatically make an investment "better" if the volatility causes you to panic, lose sleep, or sell at the bottom during a 30% drop.

Understanding volatility helps you pick an asset path that aligns with your emotional comfort zone.`,
    analogy: `Imagine two hiking trails to the same mountain peak. Trail A is a gentle paved zigzag path. Trail B is a sheer vertical cliff with loose rocks. Both reach the summit, but Trail B requires much stronger nerves and equipment!`,
    whyItMatters: `Matching your portfolio's volatility to your time horizon prevents you from panic selling during normal market turbulence.`,
    commonMisconception: `**Myth:** "Volatility means permanent loss."
**Reality:** Volatility is just the emotional bumps along the road; as long as you remain invested in quality diversified assets, price cycles tend to smooth out over 5+ years.`,
    deepDive: `Standard Deviation is the statistical metric used by fund factsheets to measure volatility.`,
    quiz: [
      {
        question: "If Investment A and Investment B both grew from ₹10k to ₹14k in 3 years, but Investment B experienced frequent -20% plunges along the way, which investment was more volatile?",
        options: [
          "Investment A",
          "Investment B (experienced much wider price swings)",
          "Both had identical zero volatility",
          "Neither, because both ended at ₹14k"
        ],
        correctIndex: 1,
        explanation: "Volatility measures the magnitude of price swings and drawdowns along the journey."
      }
    ]
  },
  {
    id: "drawdowns-and-market-falls",
    title: "Lesson 6 — Drawdowns & Market Recoveries",
    category: "READING CHARTS",
    week: 3,
    duration: "4 min",
    xp: 65,
    hasInteractiveChart: "drawdown_visualizer",
    summary: "Peak ➔ Drop ➔ Recovery. Why seeing a red decline is an unrealized temporary drawdown.",
    explanation: `A **Drawdown** measures the percentage drop from an investment's highest peak (All-Time High) to its lowest subsequent trough.

**The Anatomy of a Drawdown:**
1. **The Peak (Top):** For example, your portfolio reaches ₹14,000.
2. **The Decline:** Due to economic news or market corrections, the value temporarily slides to ₹10,500 (**-25% Drawdown**).
3. **The Recovery:** Over the next 6–12 months, company profits rise, and the portfolio climbs back to a new high of ₹14,500.

**The Golden Rule of Drawdowns:**
A drawdown is an **unrealized paper drop**. You only convert a temporary drawdown into a permanent, unrecoverable loss if you hit the panic **SELL** button at the bottom!`,
    analogy: `Think of breathing. Your lungs expand to maximum air (peak), then contract as you exhale (drawdown), before inhaling fresh air again (recovery). You don't panic when you exhale because you know the next breath is coming!`,
    whyItMatters: `Every single major index (Nifty 50, S&P 500) experiences 10% to 20% drawdowns almost every 2 years, yet broad economies continue growing over decade horizons.`,
    commonMisconception: `**Myth:** "When my portfolio is -15%, my money has vanished into thin air."
**Reality:** You still own the exact same number of company shares or fund units. Their market quote has temporarily dipped, but their operational production continues.`,
    deepDive: `Maximum Drawdown (MDD) is a key risk metric evaluated by professional wealth managers before choosing mutual funds.`,
    quiz: [
      {
        question: "An investment rises to ₹14,000 (peak) and later dips to ₹10,500. How much did it fall from its peak in percentage terms?",
        options: [
          "-10%",
          "-25% (₹3,500 drop from ₹14,000)",
          "-50%",
          "-5%"
        ],
        correctIndex: 1,
        explanation: "(10,500 - 14,000) / 14,000 = -3,500 / 14,000 = -25% drawdown."
      }
    ]
  },
  {
    id: "comparing-investments",
    title: "Lesson 7 — Comparing Investments on the Same Chart",
    category: "READING CHARTS",
    week: 4,
    duration: "4 min",
    xp: 70,
    hasInteractiveChart: "compare_two",
    summary: "Benchmark comparison: Never judge an investment in isolation.",
    explanation: `Looking at an investment's chart by itself can be misleading. A fund might be up +10%, which sounds great—until you see that the overall Nifty 50 market index was up +22% over that same period!

**How to Compare on a Chart:**
- **Overlay Comparison:** Plot two lines on the exact same percentage-scale chart starting at 0%.
- **Benchmark:** The standard against which performance is judged (e.g. Nifty 50 Index for Indian large-cap equities).
- **Alpha:** When an actively managed fund beats its benchmark.

**Timeframe Sensitivity:**
- Over **1 Month**, Asset A might beat Asset B due to short-term news.
- Over **5 Years**, Asset B might outperform Asset A by 60% due to superior underlying business compounding!`,
    analogy: `Imagine a runner finishing a 100-meter dash in 15 seconds. By itself, 15 seconds sounds okay. But if the rest of the school team finished in 11 seconds, you know they were trailing the pack! Comparison gives context.`,
    whyItMatters: `Always compare a mutual fund's return against its benchmark index (like Nifty 50) to verify if you are getting value for the expense ratio you pay.`,
    commonMisconception: `**Myth:** "Comparing share prices (₹100 vs ₹500) tells you which stock performed better."
**Reality:** Only percentage change over identical timeframes reveals the true winner.`,
    deepDive: `Groww provides direct 1-click benchmark comparison charts on every mutual fund and ETF page.`,
    quiz: [
      {
        question: "Why is comparing an equity mutual fund against a benchmark like Nifty 50 important?",
        options: [
          "To see whether the fund is actually generating value compared to a low-cost passive index",
          "Because government law forces everyone to buy the exact same stocks",
          "To guarantee that you will never experience price dips",
          "To eliminate income taxes"
        ],
        correctIndex: 0,
        explanation: "Benchmark comparison shows whether active management is outperforming the broad market."
      }
    ]
  },

  // ==========================================
  // START HERE (EXISTING FOUNDATIONS)
  // ==========================================
  {
    id: "what-is-investing",
    title: "What is Investing?",
    category: "START HERE",
    week: 1,
    duration: "3 min",
    xp: 50,
    summary: "Putting your money to work so it grows faster than inflation over time.",
    explanation: `Investing means putting your money into assets—like companies, government bonds, or real estate—that have the potential to grow in value and generate income over time.

When you invest, you don't just store cash; you become a part-owner of businesses or lend money to entities that pay you returns for using your capital.

The primary enemy of idle cash is **Inflation** (the rising cost of goods and services). If your money earns less than inflation in a bank locker, your purchasing power quietly decreases every year.`,
    analogy: `Think of your money like seeds. If you store apple seeds in a drawer (cash in a locker), you still have the same seeds 5 years later. But if you plant and water them in fertile soil (investing), they can grow into a tree that produces baskets of apples year after year.`,
    whyItMatters: `Starting in your 20s gives you the biggest superpower in finance: **Time**. Even investing ₹1,000 a month in your early twenties can grow significantly more than ₹5,000 a month started in your thirties because of compounding.`,
    commonMisconception: `**Myth:** "I need at least ₹50,000 or a finance degree to start."
**Reality:** You can start investing with as little as ₹100 through micro-SIPs on modern platforms.`,
    deepDive: `The two main sources of return in investing are **Capital Appreciation** (the asset's price increasing) and **Cash Flows** (dividends from stocks or interest from debt).`,
    quiz: [
      {
        question: "Why is simply keeping all your money as cash in a savings locker risky in the long run?",
        options: [
          "Banks will charge you money to hold physical cash",
          "Inflation erodes your purchasing power over time",
          "Cash automatically expires after 3 years",
          "You must pay capital gains tax on physical currency"
        ],
        correctIndex: 1,
        explanation: "Because inflation causes prices to rise, ₹1,000 sitting idle today will buy fewer groceries and movie tickets 10 years from now."
      },
      {
        question: "What is the key advantage of starting to invest in your early 20s?",
        options: [
          "You are guaranteed never to experience market dips",
          "You have the advantage of time for compounding to work",
          "Government covers any investment losses for young investors",
          "You don't need to learn anything before buying"
        ],
        correctIndex: 1,
        explanation: "Time allows compounding to exponentially multiply your money. The longer your money stays invested, the harder it works for you."
      }
    ]
  },
  {
    id: "saving-vs-investing",
    title: "Saving vs Investing",
    category: "START HERE",
    week: 1,
    duration: "3 min",
    xp: 50,
    summary: "Why you need both: one protects your present, the other builds your future.",
    explanation: `Saving and investing are teammates, not competitors.

**Saving** is setting aside money for the short term (under 1–2 years) and unexpected emergencies. It focuses on safety and immediate liquidity (e.g., bank savings accounts, fixed deposits).

**Investing** is committing money for the medium-to-long term (3+ years) to beat inflation and achieve life goals like buying a house, building wealth, or financial independence. It accepts short-term price fluctuations in exchange for higher long-term growth potential.`,
    analogy: `Think of saving like a **Shield** (protects you from sudden rain, hospital bills, or phone repairs) and investing like a **Sword** (helps you conquer future inflation and build your future wealth). You need both to win!`,
    whyItMatters: `If you invest your emergency money, a sudden market dip might force you to sell at a loss when you need cash. If you only save in a bank account, inflation will eat away your future wealth.`,
    commonMisconception: `**Myth:** "I should invest 100% of whatever money I have right away."
**Reality:** First build a tiny safety cushion (emergency fund of 1–3 months expenses), then invest the rest.`,
    deepDive: `A simple rule of thumb for beginners is: Any money needed within 12 months belongs in safe savings/liquid instruments. Money meant for 3+ years can be invested in growth assets.`,
    quiz: [
      {
        question: "Where should money meant for your next semester college fees (due in 2 months) be kept?",
        options: [
          "High-risk volatile equity stock",
          "Crypto trading wallet",
          "Safe savings account or liquid fund",
          "5-year locked equity mutual fund"
        ],
        correctIndex: 2,
        explanation: "Money needed in the short term must be completely liquid and protected from market swings."
      }
    ]
  },
  {
    id: "stocks-vs-mutual-funds",
    title: "Stocks vs Mutual Funds",
    category: "START HERE",
    week: 1,
    duration: "4 min",
    xp: 60,
    summary: "Buying a single player vs owning the entire champion team.",
    explanation: `**A Stock (Share):** Represents direct fractional ownership in a single company (like Tata Motors, Infosys, or Zomato). If that specific company performs well, you profit. If that single company struggles, your investment can drop significantly.

**A Mutual Fund:** A collective pool of money gathered from thousands of investors, managed by a professional fund manager (or tracking an index), which buys a diversified basket of 40–80+ different companies.`,
    analogy: `Buying a single stock is like betting your entire match ticket on Virat Kohli scoring a century. If he gets out for a duck, your day is ruined. A mutual fund is like backing the entire Indian Cricket Team—even if one batsman fails, the bowlers and other batsmen can still win the match!`,
    whyItMatters: `As a beginner, you don't need to spend 20 hours a week reading balance sheets of individual companies. Mutual funds allow you to own the best Indian companies with instant diversification.`,
    commonMisconception: `**Myth:** "Mutual funds are risk-free."
**Reality:** Mutual funds invest in the market, so their value goes up and down with market cycles, but diversification protects you from the total collapse of any single company.`,
    deepDive: `Mutual funds can be **Active** (a human fund manager picks stocks to try to beat the market) or **Passive/Index** (tracks a benchmark index like Nifty 50 at ultra-low cost).`,
    quiz: [
      {
        question: "What is the primary benefit of a Mutual Fund for a first-time investor?",
        options: [
          "Guaranteed 25% returns every single month",
          "Instant diversification across many companies with professional management",
          "Zero price fluctuation regardless of market conditions",
          "Exemption from all taxes forever"
        ],
        correctIndex: 1,
        explanation: "Mutual funds spread your ₹500 or ₹1,000 across dozens of companies, dramatically reducing the risk of any single company failing."
      }
    ]
  },
  {
    id: "what-is-an-index",
    title: "What is an Index (Nifty 50 & Sensex)?",
    category: "START HERE",
    week: 1,
    duration: "3 min",
    xp: 50,
    summary: "The thermometer of the Indian economy and the backbone of beginner investing.",
    explanation: `An **Index** is a statistical benchmark that measures the performance of a selected group of top companies in the market.

In India:
- **NIFTY 50:** Tracks the 50 largest, most established companies listed on the National Stock Exchange (NSE) across various sectors (like Reliance, HDFC Bank, TCS, L&T, ITC).
- **SENSEX:** Tracks the 30 largest companies on the Bombay Stock Exchange (BSE).

When news headlines announce *"The market rose 1% today"*, they are referring to the movement of these indices!`,
    analogy: `Imagine the report card of a top school. The index isn't just one student; it's the class average of the top 50 top-performing students. If one student has a bad day, but others do great, the class average continues to trend upward as the school improves over years.`,
    whyItMatters: `An **Index Fund** simply buys all 50 companies in the exact same proportion as the Nifty 50. You get automatic exposure to India's economic growth without having to predict which individual stock will win.`,
    commonMisconception: `**Myth:** "An index only contains tech companies."
**Reality:** The Nifty 50 spans Banking, IT, Energy, Automobiles, Consumer Goods, Healthcare, and Infrastructure.`,
    deepDive: `The index automatically kicks out companies that decline and replaces them with thriving new leaders every 6 months. It's a self-cleaning portfolio!`,
    quiz: [
      {
        question: "What does the NIFTY 50 index represent?",
        options: [
          "The 50 riskiest penny stocks in India",
          "The 50 largest and most established bluechip companies in India",
          "A government-guaranteed fixed deposit scheme",
          "A list of 50 new startup companies created this year"
        ],
        correctIndex: 1,
        explanation: "Nifty 50 tracks the 50 heavyweight pillars of the Indian economy across diverse sectors."
      }
    ]
  },
  {
    id: "risk-and-return",
    title: "Understanding Risk: Volatility vs Loss",
    category: "START HERE",
    week: 1,
    duration: "4 min",
    xp: 60,
    summary: "Why price swings are normal, and how patience turns volatility into your friend.",
    explanation: `Risk in investing is often misunderstood.

**Volatility** is the normal daily or monthly fluctuation in asset prices. Just like the price of vegetables or gold moves around based on demand and supply, stock prices fluctuate every second.

**Permanent Loss of Capital** happens when you invest in a bad, bankrupt company, or when you panic and sell good assets at the bottom during a temporary market downturn.

**The Golden Rule:** In genuine investing, higher potential return comes with higher short-term volatility. There is NO SUCH THING as "High returns with zero risk". Anyone promising that is lying.`,
    analogy: `Think of a roller coaster ride. During the dips and loops, your heart races (volatility), but as long as you stay strapped in your seat until the ride finishes at the station, you arrive safely. If you jump out mid-loop in panic (selling at the bottom), that is where real damage occurs!`,
    whyItMatters: `When your portfolio shows -5% next week, knowing that volatility is the admission price for long-term compounding keeps you calm and stops you from making emotional mistakes.`,
    commonMisconception: `**Myth:** "A red day in the market means I have lost real money."
**Reality:** You only lock in a loss if you actually sell. Paper fluctuations are normal market breath.`,
    deepDive: `History shows that over any 7 to 10 year period, broad market indices like Nifty 50 have consistently delivered positive inflation-beating returns despite countless temporary crises.`,
    quiz: [
      {
        question: "If your ₹5,000 diversified index investment temporarily drops to ₹4,600 after 2 months, what has happened?",
        options: [
          "You have permanently lost ₹400 forever",
          "The market is experiencing normal short-term volatility (unrealized fluctuation)",
          "Groww has deducted ₹400 in hidden fees",
          "The Indian economy has permanently stopped growing"
        ],
        correctIndex: 1,
        explanation: "Short term dips are temporary market noise. As long as you remain invested in diversified assets with a multi-year horizon, prices tend to recover and grow."
      }
    ]
  },

  // ==========================================
  // EXPLORE MODULES
  // ==========================================
  {
    id: "what-is-a-sip",
    title: "What is a SIP (Systematic Investment Plan)?",
    category: "START HERE",
    week: 2,
    duration: "3 min",
    xp: 50,
    summary: "The ultimate habit builder: automate small monthly amounts without timing the market.",
    explanation: `A **SIP (Systematic Investment Plan)** is a disciplined method of investing a fixed amount of money (like ₹500, ₹1,000 or ₹2,000) into a mutual fund at regular intervals (usually monthly).

Instead of trying to predict the "best day" to buy, SIP invests automatically on a chosen date (e.g., the 5th of every month right after payday).

**Rupee Cost Averaging:**
- When the market is down, your fixed ₹1,000 buys **more units** at a discount.
- When the market is up, your ₹1,000 buys fewer units at a higher price.
- Over time, your average purchase cost per unit is smoothed out automatically!`,
    analogy: `Think of your Spotify or Netflix subscription. You don't renegotiate or stress about paying every month; it's a seamless automatic habit. SIP does the exact same thing, but instead of spending on entertainment, it automatically builds your future net worth.`,
    whyItMatters: `You never have to stress about "Is the market too high today?". SIP removes emotion and creates an automatic wealth-building habit.`,
    commonMisconception: `**Myth:** "A SIP is an investment product like a stock."
**Reality:** A SIP is just a payment mode (a method). The actual product is the underlying Mutual Fund or Index Fund you choose.`,
    deepDive: `You can pause, stop, increase (step-up SIP), or edit your SIP amount anytime without penalty.`,
    quiz: [
      {
        question: "What is Rupee Cost Averaging in a monthly SIP?",
        options: [
          "A tax loophole for college students",
          "Automatically buying more mutual fund units when prices are low and fewer when high",
          "Guaranteed fixed interest rate paid by the bank",
          "A method to convert Rupees into US Dollars"
        ],
        correctIndex: 1,
        explanation: "By investing the same fixed amount every month, you naturally buy more units during market dips, lowering your average cost."
      }
    ]
  },
  {
    id: "what-is-diversification",
    title: "The Art of Diversification",
    category: "START HERE",
    week: 2,
    duration: "4 min",
    xp: 60,
    summary: "Don't put all your eggs in one basket: spreading risk across sectors and assets.",
    explanation: `**Diversification** is the practice of spreading your investments across different companies, industries (like tech, banking, healthcare), and asset classes (equities, debt, gold).

If you put 100% of your savings into a single aviation company and oil prices skyrocket or travel shuts down, your whole portfolio takes a massive hit.

If you spread across 50 companies in 10 sectors, a slowdown in one sector is cushioned by gains or stability in others.`,
    analogy: `Imagine carrying 12 eggs in a single thin plastic bag. If you drop that bag, all 12 break. But if you distribute 2 eggs in a backpack, 2 in your jacket, 2 in a basket, dropping one container leaves the rest intact!`,
    whyItMatters: `Diversification is the only "free lunch" in finance—it lowers your portfolio risk without necessarily sacrificing long-term returns.`,
    commonMisconception: `**Myth:** "Buying 5 different Large Cap Tech mutual funds is great diversification."
**Reality:** If all 5 funds hold the exact same 10 tech stocks, you have heavy overlap and zero real diversification!`,
    deepDive: `True diversification includes different asset classes: Equity (for growth), Debt/Liquid (for stability), and Gold/Cash (for hedge).`,
    quiz: [
      {
        question: "Why does investing across multiple unrelated sectors reduce portfolio risk?",
        options: [
          "Because all sectors move in the exact same direction at all times",
          "Because when one sector faces headwinds, others may remain resilient or grow",
          "Because the government insures multi-sector portfolios",
          "Because you pay 0% expense ratios on diversified funds"
        ],
        correctIndex: 1,
        explanation: "Different industries react differently to economic events, smoothing out your overall portfolio performance."
      }
    ]
  },
  {
    id: "what-is-an-etf",
    title: "What is an ETF (Exchange Traded Fund)?",
    category: "START HERE",
    week: 2,
    duration: "3 min",
    xp: 50,
    summary: "The best of both worlds: a mutual fund that trades on the stock exchange like a share.",
    explanation: `An **ETF (Exchange Traded Fund)** is an investment fund that holds a collection of assets (like all 50 stocks in Nifty 50, or physical Gold) and trades directly on the stock exchange throughout market hours.

**Key differences:**
- **Mutual Fund:** Bought/sold once at the end of the day at the closing NAV (Net Asset Value).
- **ETF:** Bought and sold in real-time on your demat account just like any single stock.
- **Fees:** ETFs often have extremely low expense ratios (often 0.05% to 0.20%).`,
    analogy: `A standard Mutual Fund is like ordering a custom thali at a restaurant—prepared and billed at dinner time. An ETF is like grabbing a pre-packed ready meal from a conveyor belt anytime during lunch hours at current market price.`,
    whyItMatters: `ETFs make it super simple to invest in broad indexes, Gold, or international markets with low cost and immediate real-time price visibility.`,
    commonMisconception: `**Myth:** "ETFs require you to actively day-trade."
**Reality:** Most smart investors buy ETFs to hold for years as low-cost passive investments.`,
    deepDive: `To buy an ETF, you need a Demat and Trading account (which Groww provides in one place) and you place orders during market hours (9:15 AM to 3:30 PM).`,
    quiz: [
      {
        question: "How does an ETF differ from a regular mutual fund in how it is traded?",
        options: [
          "ETFs can only be traded on weekends",
          "ETFs trade in real-time on the stock exchange throughout market hours",
          "ETFs are completely illegal in India",
          "ETFs can only be purchased by foreign banks"
        ],
        correctIndex: 1,
        explanation: "ETFs trade just like individual stocks during regular stock market hours at live fluctuating prices."
      }
    ]
  },
  {
    id: "understanding-fees",
    title: "Understanding Fees & Expense Ratios",
    category: "UNDERSTAND YOUR MONEY",
    week: 2,
    duration: "3 min",
    xp: 50,
    summary: "How small 1% fee differences can save you lakhs of rupees over decades.",
    explanation: `Nothing in finance is 100% free, and understanding what you pay is critical.

**Expense Ratio:** The annual percentage fee that a mutual fund or ETF charges to cover its management, research, operations, and administrative costs.

**Direct vs Regular Plans:**
- **Direct Plan:** You invest directly with the fund house through platforms like Groww. No agent commission. Expense ratio is lower (e.g., 0.2% - 0.7%).
- **Regular Plan:** Sold through traditional middlemen/distributors who take an ongoing commission cut every single year (e.g., 1.5% - 2.2%).`,
    analogy: `Imagine filling your car's fuel tank, but the petrol nozzle has a tiny invisible leak of 1.5% every single minute. In a 10-minute drive, you won't notice it. But on a cross-country 20-year road trip, that leak costs you an entire second car!`,
    whyItMatters: `Choosing Direct Mutual Funds on Groww ensures 100% of your money works for you without hidden middleman cuts. Over 20 years, a 1% difference in expense ratio can translate to over ₹15–20 Lakhs in saved compounding returns!`,
    commonMisconception: `**Myth:** "I will get a monthly bill in my email for the mutual fund expense ratio."
**Reality:** The expense ratio is automatically adjusted from the fund's daily NAV, so you don't pay out of pocket, but it directly affects your net returns.`,
    deepDive: `Always look at the 'Total Expense Ratio' (TER) on any fund factsheet before starting an SIP.`,
    quiz: [
      {
        question: "Why are Direct Mutual Fund plans superior to Regular plans for long-term investors?",
        options: [
          "Direct plans guarantee zero market volatility",
          "Direct plans have lower expense ratios because no middleman commissions are deducted",
          "Direct plans allow you to bypass government income taxes",
          "Direct plans let you control the company CEO"
        ],
        correctIndex: 1,
        explanation: "Direct plans cut out intermediary commissions, leaving more of your money invested to compound over time."
      }
    ]
  },

  // ==========================================
  // PRACTICE & ADVANCED CONCEPTS
  // ==========================================
  {
    id: "power-of-compounding",
    title: "The Power of Compounding & Inflation",
    category: "UNDERSTAND YOUR MONEY",
    week: 3,
    duration: "4 min",
    xp: 60,
    summary: "Interest earning interest: the math that turns small consistent savings into wealth.",
    explanation: `**Compound Interest** is when the returns you earn on your investments begin generating their own returns.

**Simple Interest:** You invest ₹1,000 at 10%. Year 1 you get ₹100. Year 2 you get ₹100.
**Compound Growth:** You invest ₹1,000 at 10%.
- Year 1: You have ₹1,100 (earned ₹100).
- Year 2: You earn 10% on ₹1,100 = ₹1,210 (earned ₹110).
- Year 10: Your original ₹1,000 becomes ₹2,593!
- Year 25: Your original ₹1,000 becomes ₹10,834 without adding a single extra rupee!

Now imagine adding ₹2,000 every single month! Over 20 years, the compounding snowball becomes massive.`,
    analogy: `Imagine rolling a tiny snowball from the top of a snowy Himalayan peak. At first, it's just a baseball size. But as it rolls down the mountain, it picks up more snow, getting larger and faster with every single rotation until it's an unstoppable giant boulder!`,
    whyItMatters: `The secret ingredient in compounding isn't large sums of money—it's **Time**. Starting at 21 with ₹1,500/month will beat someone starting at 32 with ₹6,000/month by retirement age.`,
    commonMisconception: `**Myth:** "Compounding shows magic in the first 6 months."
**Reality:** Compounding is boring and slow in years 1 to 4, noticeable in years 5 to 10, and explosive after year 15.`,
    deepDive: `The Rule of 72: Divide 72 by your expected annual return rate to estimate how many years it takes to double your money. (e.g., 72 / 12% = 6 years to double).`,
    quiz: [
      {
        question: "What is the single most critical factor that makes compounding powerful?",
        options: [
          "Trading in and out of stocks 5 times a day",
          "Giving your investments a long time horizon to snowball",
          "Borrowing high-interest personal loans to invest",
          "Constantly switching mutual funds every month"
        ],
        correctIndex: 1,
        explanation: "Time allows the exponential curve of returns-on-returns to grow into significant wealth."
      }
    ]
  },
  {
    id: "emergency-fund-basics",
    title: "Emergency Fund 101: Your Financial Armor",
    category: "UNDERSTAND YOUR MONEY",
    week: 3,
    duration: "3 min",
    xp: 50,
    summary: "Why you must build a safety buffer before aggressive wealth building.",
    explanation: `An **Emergency Fund** is money set aside strictly for unplanned financial emergencies (like unexpected medical bills, bike breakdown, sudden laptop repair, or temporary job loss between internships).

**How much do you need?**
- **Student / Intern:** ₹5,000 to ₹15,000 (enough for travel, device repair, or immediate needs).
- **Working Professional:** 3 to 6 months of essential monthly living expenses.

**Where to keep it?**
- High-yield savings bank account, or
- Overnight / Liquid Mutual Funds (where money can be withdrawn within 24 hours with negligible risk).`,
    analogy: `Think of a spare tire in your car trunk. You hope you never get a flat tire on a highway road trip, but having that spare tire prevents your entire journey from grinding to a halt.`,
    whyItMatters: `Without an emergency fund, a minor unexpected ₹10,000 expense could force you to sell your long-term investments at a market low, or borrow at 36% interest on a credit card.`,
    commonMisconception: `**Myth:** "An emergency fund should be invested in high-return crypto or small-cap stocks."
**Reality:** The goal of an emergency fund is 100% safety and immediate accessibility, NOT high return.`,
    deepDive: `Keep your emergency fund in a separate bank account from your daily UPI spending account so you aren't tempted to spend it on weekend food deliveries!`,
    quiz: [
      {
        question: "What is the primary objective of an Emergency Fund?",
        options: [
          "To generate 30% speculative profits",
          "To ensure immediate liquidity and capital safety for unexpected emergencies",
          "To show off high account balance to friends",
          "To avoid KYC verification"
        ],
        correctIndex: 1,
        explanation: "Emergency funds prioritize safety and immediate access so you never have to sell investments in a crisis."
      }
    ]
  },
  {
    id: "time-horizon-and-goals",
    title: "Matching Goals to Time Horizon",
    category: "UNDERSTAND YOUR MONEY",
    week: 3,
    duration: "4 min",
    xp: 60,
    summary: "How to choose between Debt, Balanced, and Equity depending on when you need the money.",
    explanation: `Different goals require different financial tools depending on your **Time Horizon**:

1. **Short Term (< 1 Year):**
   - Goals: New smartphone, semester fees, vacation next month.
   - Best fit: Bank Savings, Fixed Deposits, Liquid / Ultra-Short Term Debt Funds. (Zero equity risk).

2. **Medium Term (1 to 3 Years):**
   - Goals: Post-grad tuition savings, buying a two-wheeler.
   - Best fit: Conservative Hybrid Funds, Arbitrage Funds, Short Duration Debt.

3. **Long Term (3 to 5+ Years):**
   - Goals: Higher education abroad, dream wedding, financial independence, home down payment.
   - Best fit: Diversified Equity Index Funds, Flexi-Cap Funds, ELSS.`,
    analogy: `You wouldn't take a supersonic airplane to visit your neighbor down the street, and you wouldn't ride a bicycle across an ocean. Matching your vehicle (asset type) to your distance (time horizon) ensures you reach your destination smoothly.`,
    whyItMatters: `Putting short-term money into high-risk equity can result in having less money when the bill is due. Putting 10-year money into a savings account guarantees losing to inflation.`,
    commonMisconception: `**Myth:** "All young people should invest 100% in high-risk stocks regardless of when they need the money."
**Reality:** Your personal goal deadline dictates the right level of risk, not your age alone.`,
    deepDive: `As you get within 6–12 months of a long-term goal, gradually shift profits from equity into safe debt/liquid funds to protect your accumulated target.`,
    quiz: [
      {
        question: "If you want to buy a laptop 8 months from today, which instrument is most appropriate?",
        options: [
          "Small-cap equity mutual fund",
          "High-risk derivative options trading",
          "Liquid fund or bank recurring deposit",
          "Real estate land purchase"
        ],
        correctIndex: 2,
        explanation: "Short-term goals (under 1 year) must avoid equity volatility and stay in safe, liquid savings instruments."
      }
    ]
  },
  {
    id: "reading-company-basics",
    title: "Reading Company Basics (P/E, Revenue & Profits)",
    category: "LEVEL UP",
    week: 4,
    duration: "4 min",
    xp: 60,
    summary: "Demystifying what numbers on a stock page actually mean.",
    explanation: `When you look at a company on Groww, you see metrics like:

- **Market Cap:** Total monetary value of all company shares (Large Cap = ₹20,000+ Cr, Mid Cap = ₹5,000–₹20,000 Cr, Small Cap = < ₹5,000 Cr).
- **Revenue (Topline):** Total money collected from selling goods/services.
- **Net Profit (Bottomline):** Money left over after paying all employee salaries, materials, taxes, and debts.
- **P/E Ratio (Price-to-Earnings):** How much investors are willing to pay for every ₹1 of profit the company generates. (If P/E is 20, you pay ₹20 for ₹1 of earnings).`,
    analogy: `Imagine your college campus chai stall. Revenue is all the ₹10 coins collected from students. Profit is what's left after buying milk, tea leaves, gas, and paying the helper. If the stall earns ₹50,000 profit a year and the owner wants to sell the stall for ₹500,000, the P/E ratio is 10!`,
    whyItMatters: `Understanding fundamental metrics prevents you from buying hyped loss-making companies just because people on social media are posting about them.`,
    commonMisconception: `**Myth:** "A stock priced at ₹10 is always cheaper than a stock priced at ₹2,000."
**Reality:** Stock price alone tells you nothing. A ₹10 stock might be heavily overvalued if the company has zero profits, while a ₹2,000 stock could be a bargain if profits are massive.`,
    deepDive: `Always compare a company's P/E ratio with its industry peers (e.g., compare TCS P/E against Infosys P/E, not against a bank).`,
    quiz: [
      {
        question: "What does the P/E (Price-to-Earnings) ratio measure?",
        options: [
          "How many employees work at the company",
          "How much investors are paying per ₹1 of company net profit",
          "The exact number of physical stores open",
          "The percentage of tax paid to the government"
        ],
        correctIndex: 1,
        explanation: "P/E compares the market valuation of the company against its underlying net profit per share."
      }
    ]
  },
  {
    id: "behavioral-biases-and-fo",
    title: "Avoiding Emotional Traps & The Reality of F&O",
    category: "LEVEL UP",
    week: 4,
    duration: "5 min",
    xp: 70,
    summary: "Why 93% of retail traders lose money in F&O, and how psychology wins in investing.",
    explanation: `The hardest part of investing isn't math—it's managing human psychology:

**Common Psychological Traps:**
- **FOMO (Fear Of Missing Out):** Buying at all-time highs because "everyone on Instagram is making money".
- **Panic Selling:** Selling solid diversified assets during temporary market corrections.
- **Loss Aversion:** The emotional pain of losing ₹1,000 feels twice as intense as the joy of making ₹1,000.

**The Reality of Futures & Options (F&O / Day Trading):**
According to official SEBI research studies:
- **Over 93% of individual retail traders in F&O make net financial losses**, averaging ₹1.25+ Lakhs in losses per trader.
- F&O is zero-sum leveraged trading where you compete with supercomputers and institutional algorithms.
- **True investing** is positive-sum wealth creation as India's real economy grows over time.`,
    analogy: `Day trading and F&O is like entering a high-speed Formula 1 race on a rainy track in a standard scooter without a helmet against professional racing teams. Long-term diversified index investing is boarding a modern, reliable Vande Bharat bullet train that gets you to your destination comfortably and safely.`,
    whyItMatters: `Protecting your hard-earned capital from get-rich-quick speculative traps is the #1 rule to becoming a wealthy and confident investor.`,
    commonMisconception: `**Myth:** "I can easily double my pocket money every week through Telegram option tips."
**Reality:** Unregulated tipsters profit from selling courses or affiliate links, while retail followers bear 100% of the losses.`,
    deepDive: `Groww FirstStep encourages building habits through verified knowledge, systematic investing, and risk management rather than adrenaline-fueled speculation.`,
    quiz: [
      {
        question: "According to official SEBI market studies, what percentage of individual retail traders lose money in Futures & Options (F&O)?",
        options: [
          "Only 5% lose money",
          "Roughly 25% lose money",
          "Over 90% of individual traders make net financial losses",
          "0% because algorithms guarantee profit"
        ],
        correctIndex: 2,
        explanation: "SEBI studies consistently show that over 90%+ of retail traders incur net losses in derivatives trading, highlighting why long-term investing is the prudent path."
      }
    ]
  }
];

export const CATEGORIES = ["ALL", "READING CHARTS", "START HERE", "UNDERSTAND YOUR MONEY", "LEVEL UP"];
